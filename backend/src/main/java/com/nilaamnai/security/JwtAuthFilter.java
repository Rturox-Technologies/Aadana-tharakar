package com.nilaamnai.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JwtAuthFilter — Intercepts every request to validate the JWT access token.
 *
 * <p>Processing order:
 * <ol>
 *   <li>Extract {@code Authorization: Bearer <token>} header</li>
 *   <li>Check Redis blacklist — if token is blacklisted (logged out), reject immediately</li>
 *   <li>Validate token signature and expiry via {@link JwtUtil}</li>
 *   <li>Load user details and set {@link SecurityContextHolder} authentication</li>
 * </ol>
 * </p>
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final RedisTemplate<String, Object> redisTemplate;

    /** Redis key prefix for blacklisted tokens set during logout. */
    private static final String BLACKLIST_PREFIX = "blacklist:";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        try {
            // ── Step 1: Check token blacklist (logged-out tokens) ────────
            if (isBlacklisted(jwt)) {
                // Token was invalidated at logout — treat as unauthenticated
                filterChain.doFilter(request, response);
                return;
            }

            // ── Step 2: Extract username and set security context ────────
            String userEmail = jwtUtil.extractUsername(jwt);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception ex) {
            // Malformed token, expired signature, etc. — continue without auth
            logger.debug("JWT validation failed: " + ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Returns {@code true} if the token has been blacklisted in Redis
     * (i.e., the user has logged out and the token was invalidated).
     *
     * <p>Redis key: {@code blacklist:{token}} with TTL = token's remaining lifetime.</p>
     */
    private boolean isBlacklisted(String token) {
        Boolean exists = redisTemplate.hasKey(BLACKLIST_PREFIX + token);
        return Boolean.TRUE.equals(exists);
    }
}
