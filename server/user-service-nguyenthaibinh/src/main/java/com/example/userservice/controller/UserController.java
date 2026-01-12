package com.example.userservice.controller;

import com.example.userservice.dto.ApiResponse;
import com.example.userservice.entity.User;
import com.example.userservice.exception.BadRequestException;
import com.example.userservice.exception.DuplicateResourceException;
import com.example.userservice.exception.ResourceNotFoundException;
import com.example.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            Map<String, Object> data = new HashMap<>();
            data.put("rows", users);
            data.put("count", users.size());
            return ResponseEntity.ok(ApiResponse.success("Lấy danh sách người dùng thành công", data));
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách người dùng: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getUserById(@PathVariable String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new BadRequestException("ID người dùng không được để trống");
        }
        
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));
        
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin người dùng thành công", user));
    }

    @GetMapping("/user-info")
    public ResponseEntity<ApiResponse<?>> getUserByEmail(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new BadRequestException("Email không được để trống");
        }
        
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với email: " + email));
        
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin người dùng thành công", user));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createUser(@RequestBody User user) {
        // Validate required fields
        if (user == null) {
            throw new BadRequestException("Dữ liệu người dùng không được để trống");
        }
        
        if (user.getUserId() == null || user.getUserId().trim().isEmpty()) {
            throw new BadRequestException("ID người dùng không được để trống");
        }
        
        if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
            throw new BadRequestException("Họ tên không được để trống");
        }
        
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new BadRequestException("Email không được để trống");
        }
        
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new BadRequestException("Mật khẩu không được để trống");
        }
        
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            throw new BadRequestException("Vai trò không được để trống");
        }
        
        // Check if email already exists
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email đã tồn tại trong hệ thống: " + user.getEmail());
        }
        
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(ApiResponse.created("Tạo người dùng thành công", createdUser), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateUser(@PathVariable String id, @RequestBody User user) {
        if (id == null || id.trim().isEmpty()) {
            throw new BadRequestException("ID người dùng không được để trống");
        }
        
        if (user == null) {
            throw new BadRequestException("Dữ liệu cập nhật không được để trống");
        }
        
        // Check if user exists
        userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));
        
        User updatedUser = userService.updateUser(id, user)
                .orElseThrow(() -> new RuntimeException("Lỗi khi cập nhật người dùng"));
        
        return ResponseEntity.ok(ApiResponse.success("Cập nhật người dùng thành công", updatedUser));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<ApiResponse<?>> updatePassword(@PathVariable String id, @RequestBody Map<String, String> request) {
        if (id == null || id.trim().isEmpty()) {
            throw new BadRequestException("ID người dùng không được để trống");
        }
        
        String hashedPassword = request.get("password");
        if (hashedPassword == null || hashedPassword.isEmpty()) {
            throw new BadRequestException("Mật khẩu không được để trống");
        }
        
        // Check if user exists
        userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));
        
        User updatedUser = userService.updatePassword(id, hashedPassword)
                .orElseThrow(() -> new RuntimeException("Lỗi khi cập nhật mật khẩu"));
        
        return ResponseEntity.ok(ApiResponse.success("Cập nhật mật khẩu thành công", updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUser(@PathVariable String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new BadRequestException("ID người dùng không được để trống");
        }
        
        // Check if user exists
        userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));
        
        boolean deleted = userService.deleteUser(id);
        
        if (!deleted) {
            throw new RuntimeException("Lỗi khi xóa người dùng");
        }
        
        Map<String, String> data = new HashMap<>();
        data.put("message", "Xóa người dùng thành công");
        
        return ResponseEntity.ok(ApiResponse.success("Xóa người dùng thành công", data));
    }
}

