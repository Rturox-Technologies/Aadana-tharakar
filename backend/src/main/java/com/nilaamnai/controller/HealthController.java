package com.nilaamnai.controller;

import com.nilaamnai.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

/**
 * HealthController — Public endpoint for infrastructure health probes.
 *
 * <p>Used by Docker HEALTHCHECK, load-balancers, and monitoring dashboards.
 * Always returns HTTP 200 when the application is running.
 * Declared public in {@code SecurityConfig} — no JWT required.</p>
 */
@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health", description = "Application liveness and readiness probe")
public class HealthController {

    @GetMapping
    @Operation(
        summary = "Health check",
        description = "Returns HTTP 200 with application status and timestamp. Used by Docker, Nginx, and CI/CD pipelines."
    )
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> payload = Map.of(
            "status", "UP",
            "service", "nilamnai-backend",
            "timestamp", Instant.now().toString()
        );
        return ResponseEntity.ok(ApiResponse.success("Application is healthy", payload));
    }
}
