package com.example.inventoryservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "Inventory")
public class Inventory {

    @Id
    @Column(name = "inventoryID", length = 10)
    private String inventoryID;

    @Column(name = "productID", length = 10)
    private String productID;

    @Column(name = "importedQuantity")
    private int importedQuantity;

    @Column(name = "exportedQuantity")
    private int exportedQuantity;

    @Column(name = "importDate")
    private LocalDate importDate;

    @Column(name = "exportDate")
    private LocalDate exportDate;

    @Column(name = "ageProduct")
    private int ageProduct;

    @Column(name = "inventoryStatus")
    private String inventoryStatus;

    @Column(name = "remainingStock")
    private int remainingStock;

    // Getters & Setters

    public String getInventoryID() {
        return inventoryID;
    }

    public void setInventoryID(String inventoryID) {
        this.inventoryID = inventoryID;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public int getImportedQuantity() {
        return importedQuantity;
    }

    public void setImportedQuantity(int importedQuantity) {
        this.importedQuantity = importedQuantity;
    }

    public int getExportedQuantity() {
        return exportedQuantity;
    }

    public void setExportedQuantity(int exportedQuantity) {
        this.exportedQuantity = exportedQuantity;
    }

    public LocalDate getImportDate() {
        return importDate;
    }

    public void setImportDate(LocalDate importDate) {
        this.importDate = importDate;
    }

    public LocalDate getExportDate() {
        return exportDate;
    }

    public void setExportDate(LocalDate exportDate) {
        this.exportDate = exportDate;
    }

    public int getAgeProduct() {
        return ageProduct;
    }

    public void setAgeProduct(int ageProduct) {
        this.ageProduct = ageProduct;
    }

    public String getInventoryStatus() {
        return inventoryStatus;
    }

    public void setInventoryStatus(String inventoryStatus) {
        this.inventoryStatus = inventoryStatus;
    }

    public int getRemainingStock() {
        return remainingStock;
    }

    public void setRemainingStock(int remainingStock) {
        this.remainingStock = remainingStock;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "inventoryID='" + inventoryID + '\'' +
                ", productID='" + productID + '\'' +
                ", importedQuantity=" + importedQuantity +
                ", exportedQuantity=" + exportedQuantity +
                ", importDate=" + importDate +
                ", exportDate=" + exportDate +
                ", ageProduct=" + ageProduct +
                ", inventoryStatus='" + inventoryStatus + '\'' +
                ", remainingStock=" + remainingStock +
                '}';
    }
}
