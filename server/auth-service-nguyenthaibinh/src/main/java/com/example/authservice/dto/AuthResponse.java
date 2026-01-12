package com.example.authservice.dto;

import java.time.LocalDateTime;

public class AuthResponse<T> {
    private int code;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    // Constructors
    public AuthResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public AuthResponse(int code, String message) {
        this.code = code;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public AuthResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    // Factory methods
    public static <T> AuthResponse<T> success(T data) {
        return new AuthResponse<>(200, "Thành công", data);
    }

    public static <T> AuthResponse<T> success(String message, T data) {
        return new AuthResponse<>(200, message, data);
    }

    public static <T> AuthResponse<T> error(int code, String message) {
        return new AuthResponse<>(code, message);
    }

    // Getters and Setters
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
