package com.nilaamnai.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Review — User review/rating for a property.
 *
 * <p>Maps to the {@code reviews} table.
 * Enforces UNIQUE(user_id, property_id) so one user can review a property once.</p>
 */
@Entity
@Table(name = "reviews",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_review_user_property",
        columnNames = {"user_id", "property_id"}
    ),
    indexes = {
        @Index(name = "idx_review_property", columnList = "property_id"),
        @Index(name = "idx_review_rating", columnList = "rating")
    }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /** 1–5 star rating. */
    @Min(1) @Max(5)
    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Builder.Default
    private Boolean isApproved = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
