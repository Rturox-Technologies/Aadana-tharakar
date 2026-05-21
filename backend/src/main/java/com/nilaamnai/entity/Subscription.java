package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Subscription — Agent/Builder subscription plans.
 *
 * <p>Maps to the {@code subscriptions} table.
 * Tracks plan tier, validity period, and payment status.</p>
 */
@Entity
@Table(name = "subscriptions", indexes = {
    @Index(name = "idx_sub_user", columnList = "user_id"),
    @Index(name = "idx_sub_status", columnList = "status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Plan tier: FREE | BASIC | PREMIUM | ENTERPRISE
     */
    @Column(nullable = false, length = 20)
    private String plan;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    /**
     * Status: ACTIVE | EXPIRED | CANCELLED | PENDING_PAYMENT
     */
    @Column(nullable = false, length = 25)
    @Builder.Default
    private String status = "PENDING_PAYMENT";

    /** Max property listings allowed under this plan. */
    @Column(nullable = false)
    @Builder.Default
    private Integer maxListings = 3;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
