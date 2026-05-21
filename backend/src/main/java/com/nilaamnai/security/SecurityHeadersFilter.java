package com.nilaamnai.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * SecurityHeadersFilter — Injects essential HTTP security headers on every response.
 *
 * <p>Headers added:
 * <ul>
 *   <li>{@code X-Content-Type-Options: nosniff} — Prevents MIME sniffing</li>
 *   <li>{@code X-Frame-Options: DENY} — Prevents clickjacking in iframes</li>
 *   <li>{@code X-XSS-Protection: 1; mode=block} — Legacy XSS filter (IE/older Chrome)</li>
 *   <li>{@code Referrer-Policy: strict-origin-when-cross-origin} — Limits referrer leakage</li>
 *   <li>{@code Permissions-Policy} — Restricts sensitive browser APIs</li>
 * </ul>
 * </p>
 *
 * <p>Note: HSTS is intentionally omitted here and handled at the Nginx layer
 * to avoid misconfiguration during local development (HTTP).</p>
 */
@Component
public class SecurityHeadersFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // Prevent MIME type sniffing
        response.setHeader("X-Content-Type-Options", "nosniff");

        // Prevent clickjacking
        response.setHeader("X-Frame-Options", "DENY");

        // Legacy XSS filter
        response.setHeader("X-XSS-Protection", "1; mode=block");

        // Limit referrer information sent to other origins
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        // Restrict powerful browser features
        response.setHeader("Permissions-Policy",
            "camera=(), microphone=(), geolocation=(self), payment=()");

        filterChain.doFilter(request, response);
    }
}
