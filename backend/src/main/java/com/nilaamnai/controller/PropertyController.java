package com.nilaamnai.controller;

import com.nilaamnai.dto.request.PropertyCreateRequest;
import com.nilaamnai.dto.request.PropertyUpdateRequest;
import com.nilaamnai.dto.response.ApiResponse;
import com.nilaamnai.dto.response.PropertyDetailResponse;
import com.nilaamnai.dto.response.PropertySummaryResponse;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import com.nilaamnai.service.PropertyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
@Tag(name = "Properties", description = "Endpoints for managing real estate properties")
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    @Operation(summary = "Get paginated & filtered property list", description = "Public endpoint to search properties dynamically using multi-filter query parameters.")
    public ResponseEntity<ApiResponse<Page<PropertySummaryResponse>>> getProperties(
            @RequestParam(required = false) PropertyType type,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms,
            @RequestParam(required = false) PropertyStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort
    ) {
        String[] sortParts = sort.split(",");
        String sortField = sortParts[0];
        Sort.Direction sortDirection = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("asc") 
                ? Sort.Direction.ASC : Sort.Direction.DESC;
                
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        
        Page<PropertySummaryResponse> response = propertyService.getProperties(
                type, city, minPrice, maxPrice, bedrooms, bathrooms, status, pageable
        );
        return ResponseEntity.ok(ApiResponse.success("Properties fetched successfully", response));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get property details by slug", description = "Public endpoint to retrieve a detailed property record by its slug.")
    public ResponseEntity<ApiResponse<PropertyDetailResponse>> getPropertyBySlug(@PathVariable String slug) {
        PropertyDetailResponse response = propertyService.getPropertyBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Property fetched successfully", response));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT', 'BUILDER', 'USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create a new property", description = "Allows AGENT, BUILDER, or CUSTOMER (ROLE_USER) accounts to publish new properties.")
    public ResponseEntity<ApiResponse<PropertyDetailResponse>> createProperty(
            @Valid @RequestBody PropertyCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        PropertyDetailResponse response = propertyService.createProperty(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Property created successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT', 'BUILDER', 'USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update an existing property", description = "Permits modifying a property. Verifies active account ownership unless executing user is ADMIN.")
    public ResponseEntity<ApiResponse<PropertyDetailResponse>> updateProperty(
            @PathVariable UUID id,
            @Valid @RequestBody PropertyUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        PropertyDetailResponse response = propertyService.updateProperty(id, request, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Property updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT', 'BUILDER', 'USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Soft delete a property", description = "Sets property status to 'DELETED'. Ownership validation applied unless execution account is ADMIN.")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        propertyService.deleteProperty(id, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Property deleted successfully", null));
    }

    @PatchMapping("/{id}/feature")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Set property featured status", description = "ADMIN-only endpoint to toggle premium featured status for a property.")
    public ResponseEntity<ApiResponse<PropertyDetailResponse>> featureProperty(
            @PathVariable UUID id,
            @RequestParam boolean isFeatured
    ) {
        PropertyDetailResponse response = propertyService.featureProperty(id, isFeatured);
        return ResponseEntity.ok(ApiResponse.success("Property featured status updated successfully", response));
    }

    @PatchMapping("/{id}/verify")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Set property verified status", description = "ADMIN-only endpoint to mark a property as officially verified.")
    public ResponseEntity<ApiResponse<PropertyDetailResponse>> verifyProperty(
            @PathVariable UUID id,
            @RequestParam boolean isVerified
    ) {
        PropertyDetailResponse response = propertyService.verifyProperty(id, isVerified);
        return ResponseEntity.ok(ApiResponse.success("Property verification status updated successfully", response));
    }
}
