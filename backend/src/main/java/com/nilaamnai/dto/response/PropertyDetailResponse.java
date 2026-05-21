package com.nilaamnai.dto.response;

import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDetailResponse {
    private UUID id;
    private String title;
    private String slug;
    private String description;
    private PropertyType propertyType;
    private PropertyStatus status;
    private BigDecimal price;
    private Double areaSqft;
    private Integer bedrooms;
    private Integer bathrooms;
    private String city;
    private String locality;
    private String address;
    private Double latitude;
    private Double longitude;
    private Boolean isVerified;
    private Boolean isFeatured;
    private Boolean dtcpApproved;
    private Boolean cmdaApproved;
    private String reraNumber;
    private String pattaNumber;
    private Boolean waterAvailability;
    private Boolean ebConnection;
    private Boolean floodSafe;
    private Boolean vaastuCompliant;
    private Integer roadWidthFeet;

    private UserDto owner;
    private AgentDto agent;
    private BuilderDto builder;

    private List<ImageResponse> images;
    private List<VideoResponse> videos;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AgentDto {
        private UUID id;
        private String agencyName;
        private String licenseNumber;
        private Boolean verified;
        private Double rating;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BuilderDto {
        private UUID id;
        private String companyName;
        private String reraId;
        private Boolean verified;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageResponse {
        private UUID id;
        private String imageUrl;
        private Boolean isPrimary;
        private Integer sortOrder;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VideoResponse {
        private UUID id;
        private String videoUrl;
        private String title;
    }
}
