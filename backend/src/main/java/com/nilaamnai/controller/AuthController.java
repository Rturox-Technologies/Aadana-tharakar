package com.nilaamnai.controller;

import com.nilaamnai.dto.request.LoginRequest;
import com.nilaamnai.dto.request.RegisterRequest;
import com.nilaamnai.dto.request.RefreshTokenRequest;
import com.nilaamnai.dto.response.ApiResponse;
import com.nilaamnai.dto.response.AuthResponse;
import com.nilaamnai.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController — Exposes authentication and authorization endpoints.
 *
 * <p>Endpoints:
 * <ul>
 *   <li>POST /api/v1/auth/register — Create account, returns JWT pair</li>
 *   <li>POST /api/v1/auth/login — Authenticate, returns JWT pair</li>
 *   <li>POST /api/v1/auth/refresh-token — Rotate access token</li>
 *   <li>POST /api/v1/auth/logout — Invalidate access token via Redis blacklist</li>
 * </ul>
 * </p>
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user authentication and authorization")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(
        summary = "Register a new user",
        description = "Creates a new user account and profile. Returns a 15-minute access token and 7-day refresh token."
    )
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping("/login")
    @Operation(
        summary = "Authenticate user",
        description = "Verifies credentials and returns a 15-minute access token and 7-day refresh token."
    )
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh-token")
    @Operation(
        summary = "Rotate access token",
        description = "Validates the refresh token (checked against Redis), issues a new 15-minute access token."
    )
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success("Access token refreshed successfully", response));
    }

    @PostMapping("/logout")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
        summary = "Logout and invalidate token",
        description = "Adds the current access token to the Redis blacklist (TTL = token's remaining lifetime). "
                    + "Also revokes the associated refresh token from Redis."
    )
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String accessToken = authHeader.substring(7);
            authService.logout(accessToken);
        }
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully. Token has been invalidated.", null));
    }
}
