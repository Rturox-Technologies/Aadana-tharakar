package com.nilaamnai.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JwtUtil — JWT generation, validation, and claim extraction utility.
 *
 * <p>Token Policy:
 * <ul>
 *   <li><b>Access Token:</b> 15 minutes ({@code app.jwt.access-expiration-ms})</li>
 *   <li><b>Refresh Token:</b> 7 days ({@code app.jwt.refresh-expiration-ms})</li>
 * </ul>
 * </p>
 *
 * <p>Blacklist checking is performed in {@link JwtAuthFilter} using Redis
 * before this utility's validation runs.</p>
 */
@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    /** Access token: 15 minutes = 900,000 ms */
    @Value("${app.jwt.access-expiration-ms:900000}")
    private long accessExpirationMs;

    /** Refresh token: 7 days = 604,800,000 ms */
    @Value("${app.jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    // ─────────────────────────────────────────────────────────────────────
    // Token Generation
    // ─────────────────────────────────────────────────────────────────────

    /** Generate a short-lived access token (15 minutes). */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /** Generate an access token with additional custom claims. */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, accessExpirationMs);
    }

    /** Generate a long-lived refresh token (7 days). */
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpirationMs);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ─────────────────────────────────────────────────────────────────────
    // Claim Extraction
    // ─────────────────────────────────────────────────────────────────────

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** Returns remaining lifetime of the token in milliseconds. */
    public long extractRemainingTtlMs(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        long remaining = expiration.getTime() - System.currentTimeMillis();
        return Math.max(0L, remaining);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /** Also alias used by legacy JwtFilter. */
    public String getUsernameFromToken(String token) {
        return extractUsername(token);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ─────────────────────────────────────────────────────────────────────
    // Validation
    // ─────────────────────────────────────────────────────────────────────

    /** Validates token against a UserDetails object (username + expiry). */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /** Standalone token signature + expiry validation (no user lookup required). */
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token is expired, malformed, or has invalid signature
        }
        return false;
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private Key getSigningKey() {
        byte[] keyBytes = this.jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
