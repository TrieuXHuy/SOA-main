package com.example.authservice.exception;

import com.example.authservice.dto.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalAuthExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<AuthResponse<?>> handleAuthException(
            AuthException ex, WebRequest request) {
        AuthResponse<?> response = new AuthResponse<>(401, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AuthResponse<?>> handleIllegalArgument(
            IllegalArgumentException ex, WebRequest request) {
        AuthResponse<?> response = new AuthResponse<>(400, "Dữ liệu không hợp lệ: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AuthResponse<?>> handleGlobalException(
            Exception ex, WebRequest request) {
        ex.printStackTrace();
        AuthResponse<?> response = new AuthResponse<>(500, "Lỗi máy chủ: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
