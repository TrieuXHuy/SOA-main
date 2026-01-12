package com.example.productservice.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Products")
public class Product {

    @Id
    @Column(name = "productID", length = 10)
    private String productID;

    @Column(name = "productName", length = 255)
    private String productName;

    @Column(name = "importPrice")
    private int importPrice;

    @Column(name = "exportPrice")
    private int exportPrice;

    @Column(name = "supplierID", length = 10)
    private String supplierID;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "shelfLife")
    private int shelfLife;

    @Column(name = "productTypeID", length = 10)
    private String productTypeID;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "rating")
    private double rating;

    @Column(name = "sold")
    private int sold;

    @Column(name = "view")
    private int view;

    @Column(name = "sale")
    private float sale;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductImage> images = new ArrayList<>();

    // Getters & Setters

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(int importPrice) {
        this.importPrice = importPrice;
    }

    public int getExportPrice() {
        return exportPrice;
    }

    public void setExportPrice(int exportPrice) {
        this.exportPrice = exportPrice;
    }

    public String getSupplierID() {
        return supplierID;
    }

    public void setSupplierID(String supplierID) {
        this.supplierID = supplierID;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public int getShelfLife() {
        return shelfLife;
    }

    public void setShelfLife(int shelfLife) {
        this.shelfLife = shelfLife;
    }

    public String getProductTypeID() {
        return productTypeID;
    }

    public void setProductTypeID(String productTypeID) {
        this.productTypeID = productTypeID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public List<ProductImage> getImages() {
        return images;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public float getSale() {
        return sale;
    }

    public void setSale(float sale) {
        this.sale = sale;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productID='" + productID + '\'' +
                ", productName='" + productName + '\'' +
                ", importPrice=" + importPrice +
                ", exportPrice=" + exportPrice +
                ", supplierID='" + supplierID + '\'' +
                ", createdAt=" + createdAt +
                ", shelfLife=" + shelfLife +
                ", productTypeID='" + productTypeID + '\'' +
                ", description='" + description + '\'' +
                ", rating=" + rating +
                ", sold=" + sold +
                ", view=" + view +
                ", sale=" + sale +
                ", images=" + images +
                '}';
    }
}
