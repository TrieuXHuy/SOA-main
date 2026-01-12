package com.example.productservice.service.dto;

import com.example.productservice.model.Pagination;

import java.util.List;

public class ProductListResponse {
    private List<ProductResponse> products;
    private Pagination pagination;

    public ProductListResponse(List<ProductResponse> products, Pagination pagination) {
        this.products = products;
        this.pagination = pagination;
    }

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}
