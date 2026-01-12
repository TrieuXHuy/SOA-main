package com.example.productservice.controller;

import com.example.productservice.model.ProductType;
import com.example.productservice.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product-types")
public class ProductTypeController {

    @Autowired
    private ProductTypeService productTypeService;

    @GetMapping
    public List<ProductType> getAllProductTypes() {
        return productTypeService.getAllProductTypes();
    }

    @GetMapping("/{productTypeID}")
    public ResponseEntity<ProductType> getProductTypeById(@PathVariable String productTypeID) {
        Optional<ProductType> productType = productTypeService.getProductTypeById(productTypeID);
        return productType.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ProductType> createProductType(@RequestBody ProductType productType) {
        ProductType created = productTypeService.createProductType(productType);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{productTypeID}")
    public ResponseEntity<ProductType> updateProductType(
            @PathVariable String productTypeID,
            @RequestBody ProductType productType) {
        Optional<ProductType> existing = productTypeService.getProductTypeById(productTypeID);
        if (existing.isPresent()) {
            ProductType updated = productTypeService.updateProductType(productTypeID, productType);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{productTypeID}")
    public ResponseEntity<Void> deleteProductType(@PathVariable String productTypeID) {
        Optional<ProductType> existing = productTypeService.getProductTypeById(productTypeID);
        if (existing.isPresent()) {
            productTypeService.deleteProductType(productTypeID);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
