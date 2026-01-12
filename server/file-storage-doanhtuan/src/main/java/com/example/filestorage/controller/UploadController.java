package com.example.filestorage.controller;

import com.example.filestorage.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/{productCode}/{filename}")
    public ResponseEntity<byte[]> getImage(
            @PathVariable String productCode,
            @PathVariable String filename) {
        try {
            byte[] imageData = fileStorageService.loadFileAsBytes(productCode, filename);
            
            // Determine content type based on filename
            String contentType = "image/jpeg";
            if (filename.toLowerCase().endsWith(".png")) {
                contentType = "image/png";
            } else if (filename.toLowerCase().endsWith(".gif")) {
                contentType = "image/gif";
            } else if (filename.toLowerCase().endsWith(".webp")) {
                contentType = "image/webp";
            }
            
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(imageData);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{productCode}")
    public ResponseEntity<Map<String, String>> uploadFile(
            @PathVariable String productCode,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = fileStorageService.uploadFile(productCode, file);
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            response.put("message", "Upload successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Upload failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @DeleteMapping("/{productCode}/{filename}")
    public ResponseEntity<Map<String, String>> deleteFile(
            @PathVariable String productCode,
            @PathVariable String filename) {
        try {
            fileStorageService.deleteFile(productCode, filename);
            Map<String, String> response = new HashMap<>();
            response.put("message", "File deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Delete failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @DeleteMapping("/by-url")
    public ResponseEntity<Map<String, String>> deleteFileByUrl(
            @RequestParam("url") String url) {
        try {
            String objectPath = fileStorageService.extractObjectPathFromUrl(url);
            if (objectPath == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Invalid URL format");
                return ResponseEntity.badRequest().body(response);
            }
            
            fileStorageService.deleteFileByPath(objectPath);
            Map<String, String> response = new HashMap<>();
            response.put("message", "File deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Delete failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}