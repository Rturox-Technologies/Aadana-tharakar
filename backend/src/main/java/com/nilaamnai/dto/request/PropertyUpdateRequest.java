package com.nilaamnai.dto.request;

import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PropertyUpdateRequest {
    private String title;
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
    private Boolean dtcpApproved;
    private Boolean cmdaApproved;
    private String reraNumber;
    private String pattaNumber;
    private Boolean waterAvailability;
    private Boolean ebConnection;
    private Boolean floodSafe;
    private Boolean vaastuCompliant;
    private Integer roadWidthFeet;

    private List<PropertyCreateRequest.ImageDto> images;
    private List<PropertyCreateRequest.VideoDto> videos;
}
