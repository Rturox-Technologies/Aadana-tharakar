package com.nilaamnai.entity;

import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
@lombok.Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false)
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyStatus status;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "area_sqft")
    private Double areaSqft;

    private Integer bedrooms;
    private Integer bathrooms;

    @Column(nullable = false, length = 100)
    private String city;

    private String locality;
    
    @Column(columnDefinition = "TEXT")
    private String address;

    private Double latitude;
    private Double longitude;

    @Column(name = "is_verified")
    @lombok.Builder.Default
    private Boolean isVerified = false;

    @Column(name = "is_featured")
    @lombok.Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "dtcp_approved")
    @lombok.Builder.Default
    private Boolean dtcpApproved = false;

    @Column(name = "cmda_approved")
    @lombok.Builder.Default
    private Boolean cmdaApproved = false;

    @Column(name = "rera_number", length = 100)
    private String reraNumber;

    @Column(name = "patta_number", length = 100)
    private String pattaNumber;

    @Column(name = "water_availability")
    @lombok.Builder.Default
    private Boolean waterAvailability = false;

    @Column(name = "eb_connection")
    @lombok.Builder.Default
    private Boolean ebConnection = false;

    @Column(name = "flood_safe")
    @lombok.Builder.Default
    private Boolean floodSafe = false;

    @Column(name = "vaastu_compliant")
    @lombok.Builder.Default
    private Boolean vaastuCompliant = false;

    @Column(name = "road_width_feet")
    private Integer roadWidthFeet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private Agent agent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "builder_id")
    private Builder builder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<PropertyImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<PropertyVideo> videos = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}
