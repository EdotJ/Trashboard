package com.dboard.main.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegistrationRequest {
    @NotBlank(message = "{username.notEmpty}")
    @Size(min = 3, max = 15, message = "{username.size}")
    private String username;

    @NotBlank(message = "{email.notEmpty}")
    @Size(max = 40, message = "{email.size}")
    @Email(message = "{email.invalid}")
    private String email;

    @NotBlank(message = "{password.notEmpty}")
    @Size(min = 8, message = "{password.size}")
    private String password;

    private String passwordConfirm;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }
}
