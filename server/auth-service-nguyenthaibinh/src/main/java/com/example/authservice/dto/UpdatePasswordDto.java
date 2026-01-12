package com.example.authservice.dto;

public class UpdatePasswordDto {
    private String userId;
    private String password;

    // Constructors
    public UpdatePasswordDto() {}

    public UpdatePasswordDto(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
