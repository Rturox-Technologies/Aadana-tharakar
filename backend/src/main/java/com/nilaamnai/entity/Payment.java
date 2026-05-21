package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Payment — Records payment transactions for subscriptions and featured listings.
 *
 * <p>Maps to the {@code payments} table.
 * Integrates with Razorpay — stores orderId and paymentId for reconciliation.</p>
 */
@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_payment_user", columnList = "user_id"),
    @Index(name = "idx_payment_razorpay", columnList = "razorpayOrderId"),
    @Index(name = "idx_payment_status", columnList = "status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    /** INR, USD, etc. */
    @Column(nullable = false, length = 5)
    @Builder.Default
    private String currency = "INR";

    /** Razorpay order ID for payment initiation. */
    @Column(length = 100)
    private String razorpayOrderId;

    /** Razorpay payment ID for verification. */
    @Column(length = 100)
    private String razorpayPaymentId;

    /**
     * Status: PENDING | SUCCESS | FAILED | REFUNDED
     */
    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "PENDING";

    /** Human-readable purpose: e.g. "PREMIUM Plan - 3 months" */
    @Column(length = 255)
    private String description;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
