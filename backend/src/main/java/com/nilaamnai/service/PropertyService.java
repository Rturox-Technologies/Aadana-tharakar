package com.nilaamnai.service;

import com.nilaamnai.dto.request.PropertyCreateRequest;
import com.nilaamnai.dto.request.PropertyUpdateRequest;
import com.nilaamnai.dto.response.PropertyDetailResponse;
import com.nilaamnai.dto.response.PropertySummaryResponse;
import com.nilaamnai.dto.response.PropertyImageResponse;
import com.nilaamnai.dto.response.PropertyVideoResponse;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface PropertyService {
    PropertyDetailResponse createProperty(PropertyCreateRequest request, String currentUserEmail);
    PropertyDetailResponse updateProperty(UUID id, PropertyUpdateRequest request, String currentUserEmail, boolean isAdmin);
    PropertyDetailResponse getPropertyBySlug(String slug);
    Page<PropertySummaryResponse> getProperties(
            PropertyType type,
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer bedrooms,
            Integer bathrooms,
            PropertyStatus status,
            Pageable pageable
    );
    void deleteProperty(UUID id, String currentUserEmail, boolean isAdmin);
    PropertyDetailResponse featureProperty(UUID id, boolean isFeatured);
    PropertyDetailResponse verifyProperty(UUID id, boolean isVerified);
    
    List<PropertyImageResponse> uploadImages(UUID propertyId, MultipartFile[] files, String currentUserEmail, boolean isAdmin);
    PropertyVideoResponse uploadVideo(UUID propertyId, MultipartFile file, String title, String currentUserEmail, boolean isAdmin);
}
