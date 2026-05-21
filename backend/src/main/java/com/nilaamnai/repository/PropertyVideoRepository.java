package com.nilaamnai.repository;

import com.nilaamnai.entity.PropertyVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PropertyVideoRepository extends JpaRepository<PropertyVideo, UUID> {
    long countByPropertyId(UUID propertyId);
}
