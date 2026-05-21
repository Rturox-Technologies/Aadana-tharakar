package com.nilaamnai.entity;

import com.nilaamnai.enums.LeadStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Lead — Tracks buyer/renter inquiries about a specific property.
 *
 * <p>Maps to the {@code leads} table. Status follows the CRM pipeline:
 * NEW → CONTACTED → VISITED → NEGOTIATION → CLOSED / LOST.</p>
 */
@Entity
@Table(name = "leads", indexes = {
    @Index(name = "idx_lead_property", columnList = "property_id"),
    @Index(name = "idx_lead_agent", columnList = "agent_id"),
    @Index(name = "idx_lead_status", columnList = "status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lead {

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

    /** Visitor name (may differ from registered user name). */
    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 255)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private LeadStatus status = LeadStatus.NEW;

    /** Internal CRM notes added by agent. */
    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
