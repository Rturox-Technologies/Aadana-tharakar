package com.nilaamnai.repository;

import com.nilaamnai.entity.Property;
import com.nilaamnai.enums.PropertyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PropertyRepository extends JpaRepository<Property, UUID>, JpaSpecificationExecutor<Property> {
    Optional<Property> findBySlugAndStatusNot(String slug, PropertyStatus status);
    boolean existsBySlug(String slug);
}
