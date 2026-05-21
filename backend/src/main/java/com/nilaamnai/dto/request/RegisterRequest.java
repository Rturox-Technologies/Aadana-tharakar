package com.nilaamnai.dto.request;

import com.nilaamnai.dto.validation.IndianPhone;
import com.nilaamnai.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * RegisterRequest — DTO for new user account creation.
 *
 * <p>Validation rules:
 * <ul>
 *   <li>Name: required, non-blank</li>
 *   <li>Email: required, valid email format</li>
 *   <li>Phone: required, valid Indian mobile (10 digits starting with 6-9)</li>
 *   <li>Password: required, minimum 8 characters</li>
 * </ul>
 * </p>
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Phone number is required")
    @IndianPhone
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    private Role role;
}
