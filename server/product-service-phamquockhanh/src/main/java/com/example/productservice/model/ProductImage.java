package com.example.productservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ProductImages")
public class ProductImage {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "imageUrl", length = 1000)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    // Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
