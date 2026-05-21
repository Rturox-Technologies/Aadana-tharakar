package com.nilaamnai.repository.specification;

import com.nilaamnai.entity.Property;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class PropertySpecification {

    public static Specification<Property> filterBy(
            PropertyType type,
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer bedrooms,
            Integer bathrooms,
            PropertyStatus status
    ) {
        return Specification.where(hasType(type))
                .and(hasCity(city))
                .and(priceGreaterThanOrEqual(minPrice))
                .and(priceLessThanOrEqual(maxPrice))
                .and(hasBedrooms(bedrooms))
                .and(hasBathrooms(bathrooms))
                .and(hasStatus(status))
                .and(isNotDeleted());
    }

    private static Specification<Property> hasType(PropertyType type) {
        return (root, query, cb) -> type == null ? null : cb.equal(root.get("propertyType"), type);
    }

    private static Specification<Property> hasCity(String city) {
        return (root, query, cb) -> (city == null || city.isBlank()) ? null : cb.equal(cb.lower(root.get("city")), city.trim().toLowerCase());
    }

    private static Specification<Property> priceGreaterThanOrEqual(BigDecimal minPrice) {
        return (root, query, cb) -> minPrice == null ? null : cb.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    private static Specification<Property> priceLessThanOrEqual(BigDecimal maxPrice) {
        return (root, query, cb) -> maxPrice == null ? null : cb.lessThanOrEqualTo(root.get("price"), maxPrice);
    }

    private static Specification<Property> hasBedrooms(Integer bedrooms) {
        return (root, query, cb) -> bedrooms == null ? null : cb.equal(root.get("bedrooms"), bedrooms);
    }

    private static Specification<Property> hasBathrooms(Integer bathrooms) {
        return (root, query, cb) -> bathrooms == null ? null : cb.equal(root.get("bathrooms"), bathrooms);
    }

    private static Specification<Property> hasStatus(PropertyStatus status) {
        return (root, query, cb) -> status == null ? null : cb.equal(root.get("status"), status);
    }

    private static Specification<Property> isNotDeleted() {
        return (root, query, cb) -> cb.notEqual(root.get("status"), PropertyStatus.DELETED);
    }
}
