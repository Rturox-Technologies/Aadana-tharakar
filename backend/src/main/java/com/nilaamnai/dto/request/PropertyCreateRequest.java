package com.nilaamnai.dto.request;

import com.nilaamnai.dto.validation.ReraFormat;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * PropertyCreateRequest — DTO for creating a new property listing.
 *
 * <p>Tamil Nadu specific validation:
 * <ul>
 *   <li>{@code reraNumber}: Optional, but if provided must follow {@code TN/XXXXX/YYYY} format</li>
 * </ul>
 * </p>
 */
@Data
public class PropertyCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    @NotNull(message = "Property status is required")
    private PropertyStatus status;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private Double areaSqft;
    private Integer bedrooms;
    private Integer bathrooms;

    @NotBlank(message = "City is required")
    private String city;

    private String locality;
    private String address;
    private Double latitude;
    private Double longitude;

    private Boolean dtcpApproved = false;
    private Boolean cmdaApproved = false;

    @ReraFormat
    private String reraNumber;

    private String pattaNumber;
    private Boolean waterAvailability = false;
    private Boolean ebConnection = false;
    private Boolean floodSafe = false;
    private Boolean vaastuCompliant = false;
    private Integer roadWidthFeet;

    private UUID agentId;
    private UUID builderId;

    private List<ImageDto> images;
    private List<VideoDto> videos;

    @Data
    public static class ImageDto {
        private String imageUrl;
        private String publicId;
        private Boolean isPrimary = false;
        private Integer sortOrder = 0;
    }

    @Data
    public static class VideoDto {
        private String videoUrl;
        private String publicId;
        private String title;
    }
}
