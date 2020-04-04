package com.dboard.main.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "{usernameOrEmail.notEmpty}")
    private String usernameOrEmail;

    @NotBlank(message = "{password.notEmpty}")
    private String password;

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
