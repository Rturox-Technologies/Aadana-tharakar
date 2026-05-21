package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * PropertyView — Tracks unique page views per property for analytics.
 *
 * <p>Maps to the {@code property_views} table.
 * Stores IP address + fingerprint to allow deduplication of repeated views.</p>
 */
@Entity
@Table(name = "property_views", indexes = {
    @Index(name = "idx_pview_property", columnList = "property_id"),
    @Index(name = "idx_pview_date", columnList = "viewedAt")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyView {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /** Source IP for anonymous view deduplication. */
    @Column(length = 50)
    private String ipAddress;

    /** Browser/device fingerprint for more accurate unique view tracking. */
    @Column(length = 128)
    private String fingerprint;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime viewedAt;
}
