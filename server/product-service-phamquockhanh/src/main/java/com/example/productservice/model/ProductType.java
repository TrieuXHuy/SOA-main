package com.example.productservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ProductType")
public class ProductType {

    @Id
    @Column(name = "productTypeID", length = 10)
    private String productTypeID;

    @Column(name = "productTypeName", length = 100)
    private String productTypeName;

    @Column(name = "description", length = 255)
    private String description;

    // Getters & Setters

    public String getProductTypeID() {
        return productTypeID;
    }

    public void setProductTypeID(String productTypeID) {
        this.productTypeID = productTypeID;
    }

    public String getProductTypeName() {
        return productTypeName;
    }

    public void setProductTypeName(String productTypeName) {
        this.productTypeName = productTypeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // toString

    @Override
    public String toString() {
        return "ProductType{" +
                "productTypeID='" + productTypeID + '\'' +
                ", productTypeName='" + productTypeName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
