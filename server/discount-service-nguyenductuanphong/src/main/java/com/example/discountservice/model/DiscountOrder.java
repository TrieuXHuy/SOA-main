package com.example.discountservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "DiscountOrder")
public class DiscountOrder {

    @Id
    @Column(name = "discountOrderID", length = 10)
    private String discountOrderID;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "value")
    private float value;

    @Column(name = "minOrderValue")
    private long minOrderValue;

    @Column(name = "maxOrderValue")
    private Long maxOrderValue; // Dùng wrapper class để hỗ trợ giá trị null

    @Column(name = "maxDiscount")
    private long maxDiscount;

    @Column(name = "startDay")
    private LocalDate startDay;

    @Column(name = "endDay")
    private LocalDate endDay;

    @Column(name = "status", length = 20)
    private String status;

    // Getters and Setters

    public String getDiscountOrderID() {
        return discountOrderID;
    }

    public void setDiscountOrderID(String discountOrderID) {
        this.discountOrderID = discountOrderID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public long getMinOrderValue() {
        return minOrderValue;
    }

    public void setMinOrderValue(long minOrderValue) {
        this.minOrderValue = minOrderValue;
    }

    public Long getMaxOrderValue() {
        return maxOrderValue;
    }

    public void setMaxOrderValue(Long maxOrderValue) {
        this.maxOrderValue = maxOrderValue;
    }

    public long getMaxDiscount() {
        return maxDiscount;
    }

    public void setMaxDiscount(long maxDiscount) {
        this.maxDiscount = maxDiscount;
    }

    public LocalDate getStartDay() {
        return startDay;
    }

    public void setStartDay(LocalDate startDay) {
        this.startDay = startDay;
    }

    public LocalDate getEndDay() {
        return endDay;
    }

    public void setEndDay(LocalDate endDay) {
        this.endDay = endDay;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "DiscountOrder{" +
                "discountOrderID='" + discountOrderID + '\'' +
                ", name='" + name + '\'' +
                ", value=" + value +
                ", minOrderValue=" + minOrderValue +
                ", maxOrderValue=" + maxOrderValue +
                ", maxDiscount=" + maxDiscount +
                ", startDay=" + startDay +
                ", endDay=" + endDay +
                ", status='" + status + '\'' +
                '}';
    }
}
