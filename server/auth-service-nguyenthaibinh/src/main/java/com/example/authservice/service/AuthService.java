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
        Map<String, Object> user = webClient.get()
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

        if (user == null || !passwordEncoder.matches(request.getPassword(), (String) user.get("password"))) {
            throw new AuthException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken((String) user.get("userId"));
        user.remove("password");

        Map<String, Object> response = new HashMap<>();
        response.put("access_token", token);
        response.put("user", user);
        return ResponseEntity.ok(Map.of("data", response));
    }

    public ResponseEntity<?> changePassword(ChangePasswordRequest request) {
        // Lấy thông tin user từ User Service
        Map<String, Object> user = webClient.get()
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

        ChangePasswordResponse response = new ChangePasswordResponse(true, "Password changed successfully");
        return ResponseEntity.ok(response);
    }
}
