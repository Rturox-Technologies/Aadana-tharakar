package com.nilaamnai.dto.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Custom constraint — validates Tamil Nadu RERA registration numbers.
 *
 * <p>Tamil Nadu RERA format: {@code TN/XXXXX/YYYY}
 * where XXXXX is 1-7 alphanumeric characters and YYYY is a 4-digit year.</p>
 *
 * <p>Examples:
 * <ul>
 *   <li>{@code TN/12345/2023} ✓</li>
 *   <li>{@code TN/ABC123/2024} ✓</li>
 *   <li>{@code MH/12345/2023} ✗ (wrong state prefix)</li>
 *   <li>{@code TN/123/23} ✗ (wrong year format)</li>
 * </ul>
 * </p>
 */
@Documented
@Constraint(validatedBy = ReraFormatValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ReraFormat {

    String message() default "RERA number must follow Tamil Nadu format: TN/XXXXX/YYYY";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
