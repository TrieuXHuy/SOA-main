package com.example.deliveryservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Delivery")
public class Delivery {
    @Id
    @Column(name = "deliveryID", length = 36)
    private String deliveryID;

    @Column(name = "exportOrderID", length = 36)
    private String exportOrderID;

    @Column(name = "ghnOrderCode", length = 50)
    private String ghnOrderCode;

    @Column(name = "sortCode", length = 50)
    private String sortCode;

    @Column(name = "expectedDeliveryTime")
    private String expectedDeliveryTime;

    @Column(name = "totalFee")
    private Integer totalFee;

    @Column(name = "transType", length = 50)
    private String transType;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    public Delivery() {
    }

    public String getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(String deliveryID) {
        this.deliveryID = deliveryID;
    }

    public String getExportOrderID() {
        return exportOrderID;
    }

    public void setExportOrderID(String exportOrderID) {
        this.exportOrderID = exportOrderID;
    }

    public String getGhnOrderCode() {
        return ghnOrderCode;
    }

    public void setGhnOrderCode(String ghnOrderCode) {
        this.ghnOrderCode = ghnOrderCode;
    }

    public String getSortCode() {
        return sortCode;
    }

    public void setSortCode(String sortCode) {
        this.sortCode = sortCode;
    }

    public String getExpectedDeliveryTime() {
        return expectedDeliveryTime;
    }

    public void setExpectedDeliveryTime(String expectedDeliveryTime) {
        this.expectedDeliveryTime = expectedDeliveryTime;
    }

    public Integer getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Integer totalFee) {
        this.totalFee = totalFee;
    }

    public String getTransType() {
        return transType;
    }

    public void setTransType(String transType) {
        this.transType = transType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

