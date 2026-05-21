package com.nilaamnai.controller;

import com.nilaamnai.dto.response.ApiResponse;
import com.nilaamnai.dto.response.PropertyImageResponse;
import com.nilaamnai.service.PropertyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
@Tag(name = "Property Media", description = "Endpoints for uploading property images and videos")
public class PropertyImageController {

    private final PropertyService propertyService;

    @PostMapping("/{id}/images")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT', 'BUILDER', 'USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Upload images for a property",
            description = "Allows property owners or admins to upload up to 10 images (max 10 MB each). Returns the list of uploaded image metadata.")
    public ResponseEntity<ApiResponse<List<PropertyImageResponse>>> uploadImages(
            @PathVariable UUID id,
            @RequestParam("files") @NotEmpty @Size(max = 10) MultipartFile[] files,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        List<PropertyImageResponse> result = propertyService.uploadImages(id, files, userDetails.getUsername(), isAdmin);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Images uploaded successfully", result));
    }
}
