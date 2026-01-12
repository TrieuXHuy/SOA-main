package com.example.productservice.service.mapper;

import com.example.productservice.service.dto.ProductRequest;
import com.example.productservice.service.dto.ProductResponse;
import com.example.productservice.model.Product;
import com.example.productservice.model.ProductImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setProductID(product.getProductID());
        dto.setProductName(product.getProductName());
        dto.setImportPrice(product.getImportPrice());
        dto.setExportPrice(product.getExportPrice());

        // Convert LocalDate to LocalDateTime
        dto.setCreatedAt(product.getCreatedAt().atStartOfDay());

        dto.setShelfLife(product.getShelfLife());
        dto.setProductTypeID(product.getProductTypeID());
        dto.setDescription(product.getDescription());
        dto.setRating(product.getRating());
        dto.setSold(product.getSold());
        dto.setView(product.getView());
        dto.setSale(product.getSale());

        List<String> imageUrls = product.getImages().stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList());

        dto.setImages(imageUrls);
        return dto;
    }

    public Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setProductName(request.getProductName());
        product.setImportPrice(request.getImportPrice());
        product.setExportPrice(request.getExportPrice());
        product.setShelfLife(request.getShelfLife());
        product.setProductTypeID(request.getProductTypeID());
        product.setDescription(request.getDescription());
        product.setView(request.getView());
        return product;
    }

    public void updateEntity(Product product, ProductRequest request) {
        product.setProductName(request.getProductName());
        product.setImportPrice(request.getImportPrice());
        product.setExportPrice(request.getExportPrice());
        product.setShelfLife(request.getShelfLife());
        product.setProductTypeID(request.getProductTypeID());
        product.setDescription(request.getDescription());
        product.setView(request.getView());

        List<ProductImage> imageEntities = request.getImages().stream()
                .map(url -> {
                    ProductImage img = new ProductImage();
                    img.setImageUrl(url);
                    img.setProduct(product);
                    return img;
                }).collect(Collectors.toList());

        product.setImages(imageEntities);
    }
}
