package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "builders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@lombok.Builder
public class Builder {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "rera_id")
    private String reraId;

    @lombok.Builder.Default
    private Boolean verified = false;

    @Column(name = "established_year")
    private Integer establishedYear;

    @Column(name = "total_projects")
    @lombok.Builder.Default
    private Integer totalProjects = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
