package com.nilaamnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Blog — Content marketing blog posts.
 *
 * <p>Maps to the {@code blogs} table.
 * Supports Tamil + English bilingual content via separate fields.
 * Slug indexed for SEO-friendly URL generation.</p>
 */
@Entity
@Table(name = "blogs", indexes = {
    @Index(name = "idx_blog_slug", columnList = "slug", unique = true),
    @Index(name = "idx_blog_author", columnList = "author_id"),
    @Index(name = "idx_blog_published", columnList = "isPublished, publishedAt")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String title;

    /** Tamil version of title. Optional. */
    @Column(length = 300)
    private String titleTa;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    /** Tamil version of content. Optional. */
    @Column(columnDefinition = "TEXT")
    private String contentTa;

    @Column(length = 500)
    private String excerpt;

    /** Cloudinary URL for the hero/cover image. */
    @Column(length = 500)
    private String coverImageUrl;

    @Column(length = 50)
    private String category;

    /** JSON array of tag strings, stored as text. */
    @Column(columnDefinition = "TEXT")
    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    @Builder.Default
    private Boolean isPublished = false;

    private LocalDateTime publishedAt;

    /** SEO meta description. */
    @Column(length = 500)
    private String metaDescription;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
