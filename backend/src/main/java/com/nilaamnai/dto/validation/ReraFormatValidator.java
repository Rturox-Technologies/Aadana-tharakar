package com.nilaamnai.dto.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validator for {@link ReraFormat}.
 *
 * <p>Tamil Nadu RERA format: {@code TN/[A-Z0-9]{1,7}/[0-9]{4}}
 * Case-insensitive match; null values pass (combine with {@code @NotBlank} if required).</p>
 */
public class ReraFormatValidator implements ConstraintValidator<ReraFormat, String> {

    /**
     * Pattern breakdown:
     * <ul>
     *   <li>{@code TN/} — Tamil Nadu state prefix (case-insensitive)</li>
     *   <li>{@code [A-Z0-9]{1,7}} — 1 to 7 alphanumeric characters</li>
     *   <li>{@code /[12][0-9]{3}} — year between 1000-2999 (4 digits)</li>
     * </ul>
     */
    private static final java.util.regex.Pattern RERA_PATTERN =
            java.util.regex.Pattern.compile("(?i)^TN/[A-Z0-9]{1,7}/[12][0-9]{3}$");

    @Override
    public void initialize(ReraFormat constraintAnnotation) {
        // No initialization required
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Null and blank are valid here — pair with @NotBlank if required
        if (value == null || value.isBlank()) {
            return true;
        }
        String trimmed = value.trim().toUpperCase();

        // Basic SQL-injection guard: reject if value contains SQL meta-characters
        if (trimmed.contains("'") || trimmed.contains("--") || trimmed.contains(";")) {
            return false;
        }

        return RERA_PATTERN.matcher(trimmed).matches();
    }
}
