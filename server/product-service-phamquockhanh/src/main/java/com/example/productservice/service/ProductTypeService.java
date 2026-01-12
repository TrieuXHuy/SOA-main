package com.example.productservice.service;

import com.example.productservice.model.ProductType;
import com.example.productservice.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }

    public Optional<ProductType> getProductTypeById(String productTypeID) {
        return productTypeRepository.findById(productTypeID);
    }

    public ProductType createProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public ProductType updateProductType(String productTypeID, ProductType productType) {
        productType.setProductTypeID(productTypeID);
        return productTypeRepository.save(productType);
    }

    public void deleteProductType(String productTypeID) {
        productTypeRepository.deleteById(productTypeID);
    }
}
