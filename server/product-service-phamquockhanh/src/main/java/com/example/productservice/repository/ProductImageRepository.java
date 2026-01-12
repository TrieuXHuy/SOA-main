package com.example.productservice.repository;

import com.example.productservice.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    List<ProductImage> findByProduct_ProductID(String productID);
}
