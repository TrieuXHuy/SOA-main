package com.example.cartservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carts")
public class CartItem {

    @Id
    @Column(name = "cartItemID", length = 36)
    private String cartItemID;

    @Column(name = "userID", length = 36)
    private String userID;

    @Column(name = "productID", length = 10)
    private String productID;

    @Column(name = "productName", length = 255)
    private String productName;

    @Column(name = "exportPrice")
    private int exportPrice;

    @Column(name = "sale")
    private float sale;

    @Column(name = "imageUrl", length = 1000)
    private String imageUrl;

    @Column(name = "productTypeID", length = 10)
    private String productTypeID;

    @Column(name = "productTypeName", length = 100)
    private String productTypeName;

    @Column(name = "supplierName", length = 255)
    private String supplierName;

    @Column(name = "totalItems")
    private int totalItems;

    @Column(name = "priceUnit")
    private int priceUnit;

    public String getCartItemID() {
        return cartItemID;
    }

    public void setCartItemID(String cartItemID) {
        this.cartItemID = cartItemID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

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

    public int getExportPrice() {
        return exportPrice;
    }

    public void setExportPrice(int exportPrice) {
        this.exportPrice = exportPrice;
    }

    public float getSale() {
        return sale;
    }

    public void setSale(float sale) {
        this.sale = sale;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

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

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }

    public int getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(int priceUnit) {
        this.priceUnit = priceUnit;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "cartItemID='" + cartItemID + '\'' +
                ", userID='" + userID + '\'' +
                ", productID='" + productID + '\'' +
                ", productName='" + productName + '\'' +
                ", exportPrice=" + exportPrice +
                ", sale=" + sale +
                ", imageUrl='" + imageUrl + '\'' +
                ", productTypeID='" + productTypeID + '\'' +
                ", productTypeName='" + productTypeName + '\'' +
                ", supplierName='" + supplierName + '\'' +
                ", totalItems=" + totalItems +
                ", priceUnit=" + priceUnit +
                '}';
    }
}
