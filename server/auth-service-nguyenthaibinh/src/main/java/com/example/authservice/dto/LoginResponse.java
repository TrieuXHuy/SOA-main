package com.example.authservice.dto;

public class LoginResponse {
    private String token;
    private Object userInfo;

    public LoginResponse(String token, Object userInfo) {
        this.token = token;
        this.userInfo = userInfo;
    }

    // Getters and Setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Object getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Object userInfo) {
        this.userInfo = userInfo;
    }
}
