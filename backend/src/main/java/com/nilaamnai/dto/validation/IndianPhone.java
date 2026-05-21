package com.nilaamnai.dto.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Custom constraint — validates Indian mobile numbers.
 *
 * <p>Valid: 10-digit numbers starting with 6, 7, 8, or 9.</p>
 * <p>Examples: 9876543210 ✓ | 1234567890 ✗ | 98765432 ✗</p>
 */
@Documented
@Constraint(validatedBy = IndianPhoneValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface IndianPhone {

    String message() default "Phone number must be a valid 10-digit Indian mobile number starting with 6-9";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
