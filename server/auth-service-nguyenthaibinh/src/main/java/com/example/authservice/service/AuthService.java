package com.example.authservice.service;

import com.example.authservice.dto.ChangePasswordRequest;
import com.example.authservice.dto.ChangePasswordResponse;
import com.example.authservice.dto.LoginRequest;
import com.example.authservice.dto.LoginResponse;
import com.example.authservice.dto.UpdatePasswordDto;
import com.example.authservice.exception.AuthException;
import com.example.authservice.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private WebClient webClient;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> login(LoginRequest request) {
        try {
            // Validate input
            if (request == null || request.getEmail() == null || request.getPassword() == null) {
                throw new AuthException("Email và mật khẩu không được để trống");
            }

            Map<String, Object> response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("localhost")
                            .port(8083)
                            .path("/users/user-info")
                            .queryParam("email", request.getEmail())
                            .build()
                    )
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            // Extract user data from ApiResponse
            if (response == null) {
                throw new AuthException("Email hoặc mật khẩu không chính xác");
            }

            // Check if response has error code
            Integer code = (Integer) response.get("code");
            if (code != null && code >= 400) {
                String message = (String) response.get("message");
                throw new AuthException(message != null ? message : "Email hoặc mật khẩu không chính xác");
            }

            Map<String, Object> user;
            if (response.containsKey("data") && response.get("data") != null) {
                // New format with ApiResponse wrapper
                user = (Map<String, Object>) response.get("data");
            } else {
                // Old format (direct user)
                user = response;
            }

            if (user == null || user.get("password") == null) {
                throw new AuthException("Email hoặc mật khẩu không chính xác");
            }

            String storedPassword = (String) user.get("password");
            if (!passwordEncoder.matches(request.getPassword(), storedPassword)) {
                throw new AuthException("Email hoặc mật khẩu không chính xác");
            }

            String token = jwtTokenProvider.generateToken((String) user.get("userId"));
            user.remove("password");

            Map<String, Object> loginResponse = new HashMap<>();
            loginResponse.put("access_token", token);
            loginResponse.put("user", user);
            
            return ResponseEntity.ok(Map.of("code", 200, "message", "Đăng nhập thành công", "data", loginResponse));
        } catch (AuthException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            throw new AuthException("Lỗi đăng nhập: " + e.getMessage());
        }
    }

    public ResponseEntity<?> changePassword(ChangePasswordRequest request) {
        // Lấy thông tin user từ User Service
        Map<String, Object> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8083)
                        .path("/users/user-info")
                        .queryParam("email", request.getEmail())
                        .build()
                )
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        // Extract user data from ApiResponse
        if (response == null) {
            throw new AuthException("User not found");
        }

        Map<String, Object> user;
        if (response.containsKey("data")) {
            // New format with ApiResponse wrapper
            user = (Map<String, Object>) response.get("data");
        } else {
            // Old format (direct user)
            user = response;
        }

        // Kiểm tra user tồn tại
        if (user == null) {
            throw new AuthException("User not found");
        }

        // Kiểm tra mật khẩu cũ
        String currentPassword = (String) user.get("password");
        if (!passwordEncoder.matches(request.getOldPassword(), currentPassword)) {
            throw new AuthException("Old password is incorrect");
        }

        // Hash mật khẩu mới
        String hashedNewPassword = passwordEncoder.encode(request.getNewPassword());

        // Lấy userId
        String userId = (String) user.get("userId");

        // Cập nhật mật khẩu mới qua endpoint /users/{id}/password
        Map<String, String> passwordRequest = new HashMap<>();
        passwordRequest.put("password", hashedNewPassword);

        webClient.put()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8083)
                        .path("/users/{id}/password")
                        .build(userId)
                )
                .bodyValue(passwordRequest)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        ChangePasswordResponse changePasswordResponse = new ChangePasswordResponse(true, "Password changed successfully");
        return ResponseEntity.ok(changePasswordResponse);
    }
}
