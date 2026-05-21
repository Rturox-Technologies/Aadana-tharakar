package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Favorite — User wishlist/saved property.
 *
 * <p>Maps to the {@code favorites} table.
 * UNIQUE(user_id, property_id) ensures no duplicate wishlist entries.</p>
 */
@Entity
@Table(name = "favorites",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_favorite_user_property",
        columnNames = {"user_id", "property_id"}
    ),
    indexes = {
        @Index(name = "idx_favorite_user", columnList = "user_id")
    }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
