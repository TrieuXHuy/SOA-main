package com.example.filestorage.service;

import io.minio.*;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
public class FileStorageService {

    @Autowired
    private MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucketName;

    @Value("${minio.url}")
    private String minioUrl;

    /**
     * Initialize bucket if it doesn't exist
     */
    private void ensureBucketExists() throws Exception {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
    }

    /**
     * Upload file to MinIO
     * @param productCode Product code (productID)
     * @param file MultipartFile to upload
     * @return Public URL of the uploaded file
     */
    public String uploadFile(String productCode, MultipartFile file) throws Exception {
        ensureBucketExists();

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generate unique filename: productCode/UUID.extension
        String filename = UUID.randomUUID().toString() + extension;
        String objectName = productCode + "/" + filename;

        try (InputStream inputStream = file.getInputStream()) {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .stream(inputStream, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
        }

        // Return public URL
        return minioUrl + "/" + bucketName + "/" + objectName;
    }

    /**
     * Get file from MinIO as byte array
     * @param productCode Product code
     * @param filename Filename
     * @return File content as byte array
     */
    public byte[] loadFileAsBytes(String productCode, String filename) throws Exception {
        String objectName = productCode + "/" + filename;
        
        try (InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build())) {
            return stream.readAllBytes();
        }
    }

    /**
     * Get file from MinIO by full object path
     * @param objectPath Full path in MinIO (e.g., "SP001/uuid.jpg")
     * @return File content as byte array
     */
    public byte[] loadFileByPath(String objectPath) throws Exception {
        try (InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectPath)
                        .build())) {
            return stream.readAllBytes();
        }
    }

    /**
     * Delete file from MinIO
     * @param productCode Product code
     * @param filename Filename
     */
    public void deleteFile(String productCode, String filename) throws Exception {
        String objectName = productCode + "/" + filename;
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build()
        );
    }

    /**
     * Delete file from MinIO by full object path
     * @param objectPath Full path in MinIO (e.g., "SP001/uuid.jpg")
     */
    public void deleteFileByPath(String objectPath) throws Exception {
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectPath)
                        .build()
        );
    }

    /**
     * Extract object path from MinIO URL
     * @param url MinIO URL (e.g., "http://26.150.87.115:9100/shopee-product-media/SP001/uuid.jpg")
     * @return Object path (e.g., "SP001/uuid.jpg")
     */
    public String extractObjectPathFromUrl(String url) {
        if (url == null || !url.contains(bucketName + "/")) {
            return null;
        }
        int index = url.indexOf(bucketName + "/");
        return url.substring(index + bucketName.length() + 1);
    }
}