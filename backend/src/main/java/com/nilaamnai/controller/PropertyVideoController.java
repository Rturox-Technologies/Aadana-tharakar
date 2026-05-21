package com.nilaamnai.controller;

import com.nilaamnai.dto.response.ApiResponse;
import com.nilaamnai.dto.response.PropertyVideoResponse;
import com.nilaamnai.service.PropertyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
@Tag(name = "Property Media", description = "Endpoints for uploading property images and videos")
public class PropertyVideoController {

    private final PropertyService propertyService;

    @PostMapping("/{id}/videos")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT', 'BUILDER', 'USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Upload a video for a property",
            description = "Allows property owners or admins to upload a single video (max 100 MB). Returns the uploaded video metadata.")
    public ResponseEntity<ApiResponse<PropertyVideoResponse>> uploadVideo(
            @PathVariable UUID id,
            @RequestParam("file") @NotNull MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        PropertyVideoResponse result = propertyService.uploadVideo(id, file, title, userDetails.getUsername(), isAdmin);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Video uploaded successfully", result));
    }
}
