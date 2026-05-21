package com.nilaamnai.service.impl;

import com.nilaamnai.dto.request.LoginRequest;
import com.nilaamnai.dto.request.RegisterRequest;
import com.nilaamnai.dto.request.RefreshTokenRequest;
import com.nilaamnai.dto.response.AuthResponse;
import com.nilaamnai.dto.response.UserDto;
import com.nilaamnai.entity.Profile;
import com.nilaamnai.entity.User;
import com.nilaamnai.enums.Role;
import com.nilaamnai.exception.UnauthorizedException;
import com.nilaamnai.repository.UserRepository;
import com.nilaamnai.security.JwtUtil;
import com.nilaamnai.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

/**
 * AuthServiceImpl — Handles user registration, login, token refresh, and logout.
 *
 * <p>Security model:
 * <ul>
 *   <li>Access tokens expire in 15 minutes</li>
 *   <li>Refresh tokens expire in 7 days and are stored in Redis</li>
 *   <li>Logout blacklists the access token in Redis with TTL = remaining token lifetime</li>
 * </ul>
 * </p>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final RedisTemplate<String, Object> redisTemplate;

    /** Redis key prefix for blacklisted access tokens. */
    private static final String BLACKLIST_PREFIX = "blacklist:";

    /** Redis key prefix for refresh tokens: refresh:{email} → token */
    private static final String REFRESH_PREFIX = "refresh:";

    @Value("${app.jwt.access-expiration-ms:900000}")
    private long accessExpirationMs;

    // ─────────────────────────────────────────────────────────────────────
    // Register
    // ─────────────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        Role role = request.getRole() != null ? request.getRole() : Role.ROLE_USER;

        User user = User.builder()
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        Profile profile = Profile.builder()
                .user(user)
                .fullName(request.getName())
                .build();

        user.setProfile(profile);
        User savedUser = userRepository.save(user);

        UserDetails userDetails = buildUserDetails(savedUser);
        String accessToken = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // Store refresh token in Redis (7 days TTL)
        storeRefreshToken(savedUser.getEmail(), refreshToken);

        return buildAuthResponse(accessToken, refreshToken, savedUser);
    }

    // ─────────────────────────────────────────────────────────────────────
    // Login
    // ─────────────────────────────────────────────────────────────────────

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        UserDetails userDetails = buildUserDetails(user);
        String accessToken = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // Store / refresh the refresh token in Redis
        storeRefreshToken(user.getEmail(), refreshToken);

        return buildAuthResponse(accessToken, refreshToken, user);
    }

    // ─────────────────────────────────────────────────────────────────────
    // Refresh Token
    // ─────────────────────────────────────────────────────────────────────

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String token = request.getRefreshToken();
        if (!jwtUtil.validateToken(token)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String email = jwtUtil.extractUsername(token);

        // Verify the refresh token matches what's stored in Redis
        Object storedToken = redisTemplate.opsForValue().get(REFRESH_PREFIX + email);
        if (storedToken == null || !storedToken.toString().equals(token)) {
            throw new UnauthorizedException("Refresh token has been revoked or is invalid");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String newAccessToken = jwtUtil.generateToken(userDetails);

        return buildAuthResponse(newAccessToken, token, user);
    }

    // ─────────────────────────────────────────────────────────────────────
    // Logout — Redis blacklist
    // ─────────────────────────────────────────────────────────────────────

    @Override
    public void logout(String accessToken) {
        if (accessToken == null || accessToken.isBlank()) {
            return;
        }

        try {
            // Calculate remaining TTL of the access token
            long remainingTtlMs = jwtUtil.extractRemainingTtlMs(accessToken);

            if (remainingTtlMs > 0) {
                // Blacklist the token until it would have expired naturally
                redisTemplate.opsForValue().set(
                    BLACKLIST_PREFIX + accessToken,
                    "1",
                    remainingTtlMs,
                    TimeUnit.MILLISECONDS
                );
                log.debug("Token blacklisted with TTL={}ms", remainingTtlMs);
            }

            // Revoke the refresh token associated with this user
            String email = jwtUtil.extractUsername(accessToken);
            if (email != null) {
                redisTemplate.delete(REFRESH_PREFIX + email);
                log.debug("Refresh token revoked for user={}", email);
            }

        } catch (Exception ex) {
            // Log but don't rethrow — logout should always succeed from the client's perspective
            log.warn("Error during logout token invalidation: {}", ex.getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────────────

    private void storeRefreshToken(String email, String refreshToken) {
        redisTemplate.opsForValue().set(
            REFRESH_PREFIX + email,
            refreshToken,
            7,
            TimeUnit.DAYS
        );
    }

    private UserDetails buildUserDetails(User user) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(user.getRole().name())
                .build();
    }

    private AuthResponse buildAuthResponse(String accessToken, String refreshToken, User user) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(accessExpirationMs)
                .user(mapToUserDto(user))
                .build();
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getProfile() != null ? user.getProfile().getFullName() : null)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
