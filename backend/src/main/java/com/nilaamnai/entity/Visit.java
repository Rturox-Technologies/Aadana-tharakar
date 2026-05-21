package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Visit — Scheduled property visit appointments.
 *
 * <p>Maps to the {@code visits} table.
 * Created when a prospective buyer submits the "Schedule Visit" form
 * on the property detail page.</p>
 */
@Entity
@Table(name = "visits", indexes = {
    @Index(name = "idx_visit_property", columnList = "property_id"),
    @Index(name = "idx_visit_agent", columnList = "agent_id"),
    @Index(name = "idx_visit_scheduled", columnList = "scheduledAt"),
    @Index(name = "idx_visit_status", columnList = "status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private Agent agent;

    /** Visitor name if not a registered user. */
    @Column(nullable = false, length = 120)
    private String visitorName;

    @Column(nullable = false, length = 20)
    private String visitorPhone;

    @Column(length = 255)
    private String visitorEmail;

    /** Preferred visit date and time. */
    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    /**
     * Status: REQUESTED | CONFIRMED | COMPLETED | CANCELLED | NO_SHOW
     */
    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "REQUESTED";

    /** Agent or admin notes about the visit. */
    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
