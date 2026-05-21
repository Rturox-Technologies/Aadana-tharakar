package com.nilaamnai.service.impl;

import com.nilaamnai.dto.request.PropertyCreateRequest;
import com.nilaamnai.dto.request.PropertyUpdateRequest;
import com.nilaamnai.dto.response.PropertyDetailResponse;
import com.nilaamnai.dto.response.PropertyImageResponse;
import com.nilaamnai.dto.response.PropertySummaryResponse;
import com.nilaamnai.dto.response.PropertyVideoResponse;
import com.nilaamnai.dto.response.UserDto;
import com.nilaamnai.entity.*;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import com.nilaamnai.exception.ResourceNotFoundException;
import com.nilaamnai.exception.UnauthorizedException;
import com.nilaamnai.repository.*;
import com.nilaamnai.repository.specification.PropertySpecification;
import com.nilaamnai.service.CloudinaryService;
import com.nilaamnai.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final BuilderRepository builderRepository;
    private final PropertyImageRepository propertyImageRepository;
    private final PropertyVideoRepository propertyVideoRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public PropertyDetailResponse createProperty(PropertyCreateRequest request, String currentUserEmail) {
        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + currentUserEmail));

        String slug = generateUniqueSlug(request.getTitle());

        Property property = Property.builder()
                .title(request.getTitle())
                .slug(slug)
                .description(request.getDescription())
                .propertyType(request.getPropertyType())
                .status(request.getStatus())
                .price(request.getPrice())
                .areaSqft(request.getAreaSqft())
                .bedrooms(request.getBedrooms())
                .bathrooms(request.getBathrooms())
                .city(request.getCity())
                .locality(request.getLocality())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .dtcpApproved(request.getDtcpApproved())
                .cmdaApproved(request.getCmdaApproved())
                .reraNumber(request.getReraNumber())
                .pattaNumber(request.getPattaNumber())
                .waterAvailability(request.getWaterAvailability())
                .ebConnection(request.getEbConnection())
                .floodSafe(request.getFloodSafe())
                .vaastuCompliant(request.getVaastuCompliant())
                .roadWidthFeet(request.getRoadWidthFeet())
                .user(user)
                .build();

        if (request.getAgentId() != null) {
            Agent agent = agentRepository.findById(request.getAgentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Agent not found"));
            property.setAgent(agent);
        }

        if (request.getBuilderId() != null) {
            Builder builder = builderRepository.findById(request.getBuilderId())
                    .orElseThrow(() -> new ResourceNotFoundException("Builder not found"));
            property.setBuilder(builder);
        }

        if (request.getImages() != null) {
            Property finalProperty = property;
            property.setImages(request.getImages().stream().map(img -> PropertyImage.builder()
                    .property(finalProperty)
                    .imageUrl(img.getImageUrl())
                    .publicId(img.getPublicId())
                    .isPrimary(img.getIsPrimary())
                    .sortOrder(img.getSortOrder())
                    .build()).collect(Collectors.toList()));
        }

        if (request.getVideos() != null) {
            Property finalProperty = property;
            property.setVideos(request.getVideos().stream().map(vid -> PropertyVideo.builder()
                    .property(finalProperty)
                    .videoUrl(vid.getVideoUrl())
                    .publicId(vid.getPublicId())
                    .title(vid.getTitle())
                    .build()).collect(Collectors.toList()));
        }

        Property savedProperty = propertyRepository.save(property);
        return mapToDetailResponse(savedProperty);
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public PropertyDetailResponse updateProperty(UUID id, PropertyUpdateRequest request, String currentUserEmail, boolean isAdmin) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!isAdmin && !property.getUser().getEmail().equals(currentUserEmail)) {
            throw new UnauthorizedException("You are not the owner of this property");
        }

        if (request.getTitle() != null) {
            property.setTitle(request.getTitle());
            property.setSlug(generateUniqueSlug(request.getTitle()));
        }
        if (request.getDescription() != null) property.setDescription(request.getDescription());
        if (request.getPropertyType() != null) property.setPropertyType(request.getPropertyType());
        if (request.getStatus() != null) property.setStatus(request.getStatus());
        if (request.getPrice() != null) property.setPrice(request.getPrice());
        if (request.getAreaSqft() != null) property.setAreaSqft(request.getAreaSqft());
        if (request.getBedrooms() != null) property.setBedrooms(request.getBedrooms());
        if (request.getBathrooms() != null) property.setBathrooms(request.getBathrooms());
        if (request.getCity() != null) property.setCity(request.getCity());
        if (request.getLocality() != null) property.setLocality(request.getLocality());
        if (request.getAddress() != null) property.setAddress(request.getAddress());
        if (request.getLatitude() != null) property.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) property.setLongitude(request.getLongitude());
        if (request.getDtcpApproved() != null) property.setDtcpApproved(request.getDtcpApproved());
        if (request.getCmdaApproved() != null) property.setCmdaApproved(request.getCmdaApproved());
        if (request.getReraNumber() != null) property.setReraNumber(request.getReraNumber());
        if (request.getPattaNumber() != null) property.setPattaNumber(request.getPattaNumber());
        if (request.getWaterAvailability() != null) property.setWaterAvailability(request.getWaterAvailability());
        if (request.getEbConnection() != null) property.setEbConnection(request.getEbConnection());
        if (request.getFloodSafe() != null) property.setFloodSafe(request.getFloodSafe());
        if (request.getVaastuCompliant() != null) property.setVaastuCompliant(request.getVaastuCompliant());
        if (request.getRoadWidthFeet() != null) property.setRoadWidthFeet(request.getRoadWidthFeet());

        if (request.getImages() != null) {
            property.getImages().clear();
            Property finalProperty = property;
            property.getImages().addAll(request.getImages().stream().map(img -> PropertyImage.builder()
                    .property(finalProperty)
                    .imageUrl(img.getImageUrl())
                    .publicId(img.getPublicId())
                    .isPrimary(img.getIsPrimary())
                    .sortOrder(img.getSortOrder())
                    .build()).collect(Collectors.toList()));
        }

        if (request.getVideos() != null) {
            property.getVideos().clear();
            Property finalProperty = property;
            property.getVideos().addAll(request.getVideos().stream().map(vid -> PropertyVideo.builder()
                    .property(finalProperty)
                    .videoUrl(vid.getVideoUrl())
                    .publicId(vid.getPublicId())
                    .title(vid.getTitle())
                    .build()).collect(Collectors.toList()));
        }

        Property updatedProperty = propertyRepository.save(property);
        return mapToDetailResponse(updatedProperty);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "properties", key = "'slug::' + #slug")
    public PropertyDetailResponse getPropertyBySlug(String slug) {
        Property property = propertyRepository.findBySlugAndStatusNot(slug, PropertyStatus.DELETED)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with slug: " + slug));
        return mapToDetailResponse(property);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "properties",
               key = "'list::' + (#type != null ? #type : '') + '_' + (#city != null ? #city : '') + '_' + (#minPrice != null ? #minPrice : '') + '_' + (#maxPrice != null ? #maxPrice : '') + '_' + (#bedrooms != null ? #bedrooms : '') + '_' + (#bathrooms != null ? #bathrooms : '') + '_' + (#status != null ? #status : '') + '_' + #pageable.pageNumber + '_' + #pageable.pageSize + '_' + #pageable.sort")
    public Page<PropertySummaryResponse> getProperties(
            PropertyType type,
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer bedrooms,
            Integer bathrooms,
            PropertyStatus status,
            Pageable pageable
    ) {
        Specification<Property> spec = PropertySpecification.filterBy(type, city, minPrice, maxPrice, bedrooms, bathrooms, status);
        Page<Property> propertiesPage = propertyRepository.findAll(spec, pageable);
        return propertiesPage.map(this::mapToSummaryResponse);
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public void deleteProperty(UUID id, String currentUserEmail, boolean isAdmin) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!isAdmin && !property.getUser().getEmail().equals(currentUserEmail)) {
            throw new UnauthorizedException("You are not the owner of this property");
        }

        property.setStatus(PropertyStatus.DELETED);
        propertyRepository.save(property);
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public PropertyDetailResponse featureProperty(UUID id, boolean isFeatured) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        property.setIsFeatured(isFeatured);
        return mapToDetailResponse(propertyRepository.save(property));
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public PropertyDetailResponse verifyProperty(UUID id, boolean isVerified) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        property.setIsVerified(isVerified);
        return mapToDetailResponse(propertyRepository.save(property));
    }

    private String generateUniqueSlug(String title) {
        String baseSlug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
        String uniqueSlug = baseSlug;
        int counter = 1;
        while (propertyRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = baseSlug + "-" + counter;
            counter++;
        }
        return uniqueSlug;
    }

    private PropertySummaryResponse mapToSummaryResponse(Property p) {
        String primaryImage = p.getImages().stream()
                .filter(PropertyImage::getIsPrimary)
                .map(PropertyImage::getImageUrl)
                .findFirst()
                .orElse(p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl());

        return PropertySummaryResponse.builder()
                .id(p.getId())
                .slug(p.getSlug())
                .title(p.getTitle())
                .price(p.getPrice())
                .city(p.getCity())
                .locality(p.getLocality())
                .bedrooms(p.getBedrooms())
                .bathrooms(p.getBathrooms())
                .areaSqft(p.getAreaSqft())
                .primaryImageUrl(primaryImage)
                .isVerified(p.getIsVerified())
                .isFeatured(p.getIsFeatured())
                .propertyType(p.getPropertyType())
                .status(p.getStatus())
                .build();
    }

    private PropertyDetailResponse mapToDetailResponse(Property p) {
        UserDto ownerDto = UserDto.builder()
                .id(p.getUser().getId())
                .name(p.getUser().getProfile() != null ? p.getUser().getProfile().getFullName() : null)
                .email(p.getUser().getEmail())
                .role(p.getUser().getRole())
                .build();

        PropertyDetailResponse.AgentDto agentDto = null;
        if (p.getAgent() != null) {
            agentDto = PropertyDetailResponse.AgentDto.builder()
                    .id(p.getAgent().getId())
                    .agencyName(p.getAgent().getAgencyName())
                    .licenseNumber(p.getAgent().getLicenseNumber())
                    .verified(p.getAgent().getVerified())
                    .rating(p.getAgent().getRating())
                    .build();
        }

        PropertyDetailResponse.BuilderDto builderDto = null;
        if (p.getBuilder() != null) {
            builderDto = PropertyDetailResponse.BuilderDto.builder()
                    .id(p.getBuilder().getId())
                    .companyName(p.getBuilder().getCompanyName())
                    .reraId(p.getBuilder().getReraId())
                    .verified(p.getBuilder().getVerified())
                    .build();
        }

        List<PropertyDetailResponse.ImageResponse> imageList = p.getImages() != null ? p.getImages().stream().map(img ->
                PropertyDetailResponse.ImageResponse.builder()
                        .id(img.getId())
                        .imageUrl(img.getImageUrl())
                        .isPrimary(img.getIsPrimary())
                        .sortOrder(img.getSortOrder())
                        .build()
        ).collect(Collectors.toList()) : Collections.emptyList();

        List<PropertyDetailResponse.VideoResponse> videoList = p.getVideos() != null ? p.getVideos().stream().map(vid ->
                PropertyDetailResponse.VideoResponse.builder()
                        .id(vid.getId())
                        .videoUrl(vid.getVideoUrl())
                        .title(vid.getTitle())
                        .build()
        ).collect(Collectors.toList()) : Collections.emptyList();

        return PropertyDetailResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .slug(p.getSlug())
                .description(p.getDescription())
                .propertyType(p.getPropertyType())
                .status(p.getStatus())
                .price(p.getPrice())
                .areaSqft(p.getAreaSqft())
                .bedrooms(p.getBedrooms())
                .bathrooms(p.getBathrooms())
                .city(p.getCity())
                .locality(p.getLocality())
                .address(p.getAddress())
                .latitude(p.getLatitude())
                .longitude(p.getLongitude())
                .isVerified(p.getIsVerified())
                .isFeatured(p.getIsFeatured())
                .dtcpApproved(p.getDtcpApproved())
                .cmdaApproved(p.getCmdaApproved())
                .reraNumber(p.getReraNumber())
                .pattaNumber(p.getPattaNumber())
                .waterAvailability(p.getWaterAvailability())
                .ebConnection(p.getEbConnection())
                .floodSafe(p.getFloodSafe())
                .vaastuCompliant(p.getVaastuCompliant())
                .roadWidthFeet(p.getRoadWidthFeet())
                .owner(ownerDto)
                .agent(agentDto)
                .builder(builderDto)
                .images(imageList)
                .videos(videoList)
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public List<PropertyImageResponse> uploadImages(UUID propertyId, MultipartFile[] files, String currentUserEmail, boolean isAdmin) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!isAdmin && !property.getUser().getEmail().equals(currentUserEmail)) {
            throw new UnauthorizedException("You are not the owner of this property");
        }

        if (files == null || files.length == 0) {
            throw new IllegalArgumentException("No files provided for upload");
        }

        long currentCount = propertyImageRepository.countByPropertyId(propertyId);
        if (currentCount + files.length > 10) {
            throw new IllegalArgumentException("Total images per property cannot exceed 10. Currently uploaded: " + currentCount);
        }

        List<PropertyImage> savedImages = new ArrayList<>();
        String folder = "nilaamnai/properties/" + propertyId + "/images";

        try {
            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    throw new IllegalArgumentException("Cannot upload empty file");
                }
                if (file.getSize() > 10 * 1024 * 1024) {
                    throw new IllegalArgumentException("File size exceeds 10MB limit: " + file.getOriginalFilename());
                }

                Map<String, String> uploadResult = cloudinaryService.uploadImage(file, folder);

                PropertyImage img = PropertyImage.builder()
                        .property(property)
                        .imageUrl(uploadResult.get("url"))
                        .publicId(uploadResult.get("publicId"))
                        .isPrimary(currentCount == 0 && savedImages.isEmpty())
                        .sortOrder((int) currentCount + savedImages.size())
                        .build();

                savedImages.add(propertyImageRepository.save(img));
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload images to Cloudinary", e);
        }

        return savedImages.stream().map(img -> PropertyImageResponse.builder()
                .id(img.getId())
                .imageUrl(img.getImageUrl())
                .publicId(img.getPublicId())
                .isPrimary(img.getIsPrimary())
                .sortOrder(img.getSortOrder())
                .build()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    @CacheEvict(value = "properties", allEntries = true)
    public PropertyVideoResponse uploadVideo(UUID propertyId, MultipartFile file, String title, String currentUserEmail, boolean isAdmin) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!isAdmin && !property.getUser().getEmail().equals(currentUserEmail)) {
            throw new UnauthorizedException("You are not the owner of this property");
        }

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No video file provided for upload");
        }

        long currentCount = propertyVideoRepository.countByPropertyId(propertyId);
        if (currentCount >= 1) {
            throw new IllegalArgumentException("Property already has a video walkthrough. Max 1 video allowed.");
        }

        if (file.getSize() > 100 * 1024 * 1024) {
            throw new IllegalArgumentException("Video file size exceeds 100MB limit.");
        }

        String folder = "nilaamnai/properties/" + propertyId + "/videos";

        try {
            Map<String, String> uploadResult = cloudinaryService.uploadVideo(file, folder);

            PropertyVideo vid = PropertyVideo.builder()
                    .property(property)
                    .videoUrl(uploadResult.get("url"))
                    .publicId(uploadResult.get("publicId"))
                    .title(title != null && !title.trim().isEmpty() ? title : "Property Tour")
                    .build();

            PropertyVideo savedVideo = propertyVideoRepository.save(vid);

            return PropertyVideoResponse.builder()
                    .id(savedVideo.getId())
                    .videoUrl(savedVideo.getVideoUrl())
                    .publicId(savedVideo.getPublicId())
                    .title(savedVideo.getTitle())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload video to Cloudinary", e);
        }
    }
}
