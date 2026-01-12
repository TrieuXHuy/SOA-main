package com.example.productservice.controller;

import com.example.productservice.model.SuccessResponse;
import com.example.productservice.service.dto.ProductListResponse;
import com.example.productservice.service.dto.ProductRequest;
import com.example.productservice.service.dto.ProductResponse;

import com.example.productservice.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping
    public ResponseEntity<ProductListResponse> getPaginatedProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(name = "sort_by", defaultValue = "createdAt") String sortBy,
            @RequestParam(name = "order", defaultValue = "desc") String orderBy,
            @RequestParam(name = "price_min", required = false) Integer priceMin,
            @RequestParam(name = "price_max", required = false) Integer priceMax
    ) {
        ProductListResponse response = productService.getPaginatedProducts(page, limit, sortBy, orderBy, priceMin, priceMax);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{productID}")
    public ResponseEntity<SuccessResponse<ProductResponse>> getProductById(@PathVariable String productID) {
        Optional<ProductResponse> product = productService.getProductById(productID);
        return product
                .map(p -> ResponseEntity.ok(new SuccessResponse<>("Lấy sản phẩm thành công", p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        try {
            ProductResponse createdProduct = productService.createProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new SuccessResponse<>(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new SuccessResponse<>("Error creating product: " + e.getMessage(), null));
        }
    }

    @PutMapping("/{productID}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable String productID,
            @RequestBody ProductRequest request) {

        Optional<ProductResponse> existing = productService.getProductById(productID);
        if (existing.isPresent()) {
            ProductResponse updated = productService.updateProduct(productID, request);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{productID}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productID) {
        Optional<ProductResponse> product = productService.getProductById(productID);
        if (product.isPresent()) {
            productService.deleteProduct(productID);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{productID}/inventory")
    public ResponseEntity<?> updateProductInventory(
            @PathVariable String productID,
            @RequestParam("quantity") int quantity) {
        try {
            productService.updateProductInventory(productID, quantity);
            return ResponseEntity.ok(new SuccessResponse<>("Cập nhật tồn kho thành công", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new SuccessResponse<>(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new SuccessResponse<>("Error updating inventory: " + e.getMessage(), null));
        }
    }
}
