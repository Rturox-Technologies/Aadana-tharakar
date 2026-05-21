package com.nilaamnai.dto.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validator for {@link IndianPhone}.
 *
 * <p>Rules:
 * <ul>
 *   <li>Exactly 10 digits</li>
 *   <li>First digit must be 6, 7, 8, or 9 (TRAI allocation range)</li>
 *   <li>Null values pass (use {@code @NotBlank} / {@code @NotNull} separately)</li>
 * </ul>
 * </p>
 */
public class IndianPhoneValidator implements ConstraintValidator<IndianPhone, String> {

    /** Pattern: 10 digits, first digit in [6-9]. */
    private static final java.util.regex.Pattern INDIAN_PHONE_PATTERN =
            java.util.regex.Pattern.compile("^[6-9]\\d{9}$");

    @Override
    public void initialize(IndianPhone constraintAnnotation) {
        // No initialization required
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Allow null — pair with @NotBlank if null should be rejected
        if (value == null || value.isBlank()) {
            return true;
        }
        return INDIAN_PHONE_PATTERN.matcher(value.trim()).matches();
    }
}
