package com.nilaamnai.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * RateLimitFilter — Redis-backed per-IP and per-user rate limiting filter.
 *
 * <p>Policies:
 * <ul>
 *   <li><b>Public endpoints:</b> 100 requests/minute per source IP</li>
 *   <li><b>Authenticated users:</b> 1000 requests/minute per user email</li>
 *   <li><b>Login/register:</b> 5 attempts per 15 minutes per IP (brute-force protection)</li>
 * </ul>
 *
 * <p>On limit breach, returns HTTP 429 with a {@code Retry-After} header (seconds remaining).</p>
 *
 * <p>Redis Key Patterns:
 * <ul>
 *   <li>{@code ratelimit:public:{ip}} — TTL 60s, limit 100</li>
 *   <li>{@code ratelimit:user:{email}} — TTL 60s, limit 1000</li>
 *   <li>{@code login_attempts:{ip}} — TTL 900s (15 min), limit 5</li>
 * </ul>
 * </p>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int PUBLIC_LIMIT         = 100;
    private static final int AUTH_USER_LIMIT       = 1000;
    private static final int LOGIN_ATTEMPT_LIMIT   = 5;
    private static final long PUBLIC_WINDOW_SEC    = 60L;
    private static final long AUTH_WINDOW_SEC      = 60L;
    private static final long LOGIN_WINDOW_SEC     = 900L; // 15 minutes

    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String clientIp = resolveClientIp(request);
        String path = request.getRequestURI();

        // ── Brute-force guard on login/register ─────────────────────────
        if (isAuthEndpoint(path)) {
            if (isRateLimited(loginKey(clientIp), LOGIN_ATTEMPT_LIMIT, LOGIN_WINDOW_SEC, response)) {
                return;
            }
        }

        // ── Authenticated user: higher limit ────────────────────────────
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtUtil.extractUsername(token);
                if (email != null) {
                    if (isRateLimited(userKey(email), AUTH_USER_LIMIT, AUTH_WINDOW_SEC, response)) {
                        return;
                    }
                    filterChain.doFilter(request, response);
                    return;
                }
            } catch (Exception ignored) {
                // Invalid token — fall through to IP-based limit
            }
        }

        // ── Public / anonymous: lower limit ─────────────────────────────
        if (isRateLimited(publicKey(clientIp), PUBLIC_LIMIT, PUBLIC_WINDOW_SEC, response)) {
            return;
        }

        filterChain.doFilter(request, response);
    }

    // ─────────────────────────────────────────────────────────────────────
    // Internal helpers
    // ─────────────────────────────────────────────────────────────────────

    /**
     * Increments the counter for {@code key} and checks against {@code limit}.
     * On first increment, sets TTL to {@code windowSeconds}.
     *
     * @return {@code true} if the request should be rejected (rate limited)
     */
    private boolean isRateLimited(String key, int limit, long windowSeconds, HttpServletResponse response)
            throws IOException {

        Long count = redisTemplate.opsForValue().increment(key);

        if (count == null) {
            // Redis unavailable — fail open (don't block legitimate traffic)
            log.warn("RateLimitFilter: Redis unavailable for key={}, failing open", key);
            return false;
        }

        if (count == 1L) {
            // First request in window — set expiry
            redisTemplate.expire(key, windowSeconds, TimeUnit.SECONDS);
        }

        if (count > limit) {
            Long ttl = redisTemplate.getExpire(key, TimeUnit.SECONDS);
            long retryAfter = (ttl != null && ttl > 0) ? ttl : windowSeconds;

            log.warn("RateLimitFilter: key={} exceeded limit={} (count={})", key, limit, count);
            sendTooManyRequests(response, retryAfter);
            return true;
        }

        return false;
    }

    /** Writes a standardised 429 JSON response. */
    private void sendTooManyRequests(HttpServletResponse response, long retryAfterSeconds) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
        response.getWriter().write(
            "{\"success\":false,\"message\":\"Too many requests. Please slow down.\",\"retryAfterSeconds\":" + retryAfterSeconds + "}"
        );
    }

    /** Extract real client IP, respecting X-Forwarded-For from Nginx. */
    private String resolveClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim(); // First hop is the real client
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return request.getRemoteAddr();
    }

    private boolean isAuthEndpoint(String path) {
        return path.contains("/auth/login") || path.contains("/auth/register");
    }

    private String publicKey(String ip) {
        return "ratelimit:public:" + ip;
    }

    private String userKey(String email) {
        return "ratelimit:user:" + email;
    }

    private String loginKey(String ip) {
        return "login_attempts:" + ip;
    }
}
