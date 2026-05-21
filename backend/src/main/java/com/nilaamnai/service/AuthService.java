package com.nilaamnai.service;

import com.nilaamnai.dto.request.LoginRequest;
import com.nilaamnai.dto.request.RegisterRequest;
import com.nilaamnai.dto.request.RefreshTokenRequest;
import com.nilaamnai.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);

    /**
     * Invalidates the given JWT access token by adding it to the Redis blacklist.
     *
     * @param accessToken the raw JWT string from the Authorization header (without "Bearer " prefix)
     */
    void logout(String accessToken);
}
