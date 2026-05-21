package com.nilaamnai.dto.response;

import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertySummaryResponse {
    private UUID id;
    private String slug;
    private String title;
    private BigDecimal price;
    private String city;
    private String locality;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqft;
    private String primaryImageUrl;
    private Boolean isVerified;
    private Boolean isFeatured;
    private PropertyType propertyType;
    private PropertyStatus status;
}
