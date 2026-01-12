package com.example.orderservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ExportOrderDetail")
public class ExportOrderDetail {
    @Id
    @Column(name = "exportOrderDetailID", length = 36)
    private String exportOrderDetailID;

    @Column(name = "exportOrderID", length = 36)
    private String exportOrderID;

    @Column(name = "productID", length = 10)
    private String productID;

    @Column(name = "productName", length = 255)
    private String productName;

    @Column(name = "imageUrl", length = 1000)
    private String imageUrl;

    @Column(name = "exportPrice")
    private int exportPrice;

    @Column(name = "totalItems")
    private int totalItems;

    @Column(name = "priceUnit")
    private int priceUnit;

    public String getExportOrderDetailID() {
        return exportOrderDetailID;
    }

    public void setExportOrderDetailID(String exportOrderDetailID) {
        this.exportOrderDetailID = exportOrderDetailID;
    }

    public String getExportOrderID() {
        return exportOrderID;
    }

    public void setExportOrderID(String exportOrderID) {
        this.exportOrderID = exportOrderID;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getExportPrice() {
        return exportPrice;
    }

    public void setExportPrice(int exportPrice) {
        this.exportPrice = exportPrice;
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
        return "ExportOrderDetail{" +
                "exportOrderDetailID='" + exportOrderDetailID + '\'' +
                ", exportOrderID='" + exportOrderID + '\'' +
                ", productID='" + productID + '\'' +
                ", productName='" + productName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", exportPrice=" + exportPrice +
                ", totalItems=" + totalItems +
                ", priceUnit=" + priceUnit +
                '}';
    }
}
