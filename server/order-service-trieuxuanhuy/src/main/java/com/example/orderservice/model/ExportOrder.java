package com.example.orderservice.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "ExportOrder")
public class ExportOrder {
    @Id
    @Column(name = "exportOrderID", length = 36)
    private String exportOrderID;

    @Column(name = "userID", length = 36)
    private String userID;

    @Column(name = "fullName", length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 20)
    private String phoneNumber;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "productDiscountId", length = 10)
    private String productDiscountId;

    @Column(name = "totalPrice")
    private int totalPrice;

    @Column(name = "endowID", length = 10)
    private String endowID;

    @Column(name = "paymentId", length = 10)
    private String paymentId;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "status", length = 20)
    private String status = "PENDING";

    @OneToMany
    @JoinColumn(name = "exportOrderID")
    private List<ExportOrderDetail> orderDetails;

    public String getExportOrderID() {
        return exportOrderID;
    }

    public void setExportOrderID(String exportOrderID) {
        this.exportOrderID = exportOrderID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProductDiscountId() {
        return productDiscountId;
    }

    public void setProductDiscountId(String productDiscountId) {
        this.productDiscountId = productDiscountId;
    }


    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getEndowID() {
        return endowID;
    }

    public void setEndowID(String endowID) {
        this.endowID = endowID;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ExportOrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<ExportOrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    @Override
    public String toString() {
        return "ExportOrder{" +
                "exportOrderID='" + exportOrderID + '\'' +
                ", userID='" + userID + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", productDiscountId='" + productDiscountId + '\'' +
                ", totalPrice=" + totalPrice +
                ", endowID='" + endowID + '\'' +
                ", paymentId='" + paymentId + '\'' +
                ", createdAt=" + createdAt +
                ", status='" + status + '\'' +
                ", orderDetails=" + orderDetails +
                '}';
    }
}