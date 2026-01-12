package com.example.discountservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "DiscountCustomer")
public class DiscountCustomer {

    @Id
    @Column(name = "ID", length = 10)
    private String id;

    @Column(name = "customerTypeId", length = 1)
    private String customerTypeId;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "discountValue")
    private float discountValue;

    @Column(name = "minValueDiscount", nullable = false)
    private long minValueDiscount;

    @Column(name = "maxValueDiscount")
    private Long maxValueDiscount;

    @Column(name = "minDiscount")
    private Long minDiscount;

    @Column(name = "maxDiscount")
    private Long maxDiscount;

    @Column(name = "startDay")
    private LocalDate startDay;

    @Column(name = "endDay")
    private LocalDate endDay;

    @Column(name = "status", length = 20)
    private String status;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerTypeId() {
        return customerTypeId;
    }

    public void setCustomerTypeId(String customerTypeId) {
        this.customerTypeId = customerTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(float discountValue) {
        this.discountValue = discountValue;
    }

    public long getMinValueDiscount() {
        return minValueDiscount;
    }

    public void setMinValueDiscount(long minValueDiscount) {
        this.minValueDiscount = minValueDiscount;
    }

    public Long getMaxValueDiscount() {
        return maxValueDiscount;
    }

    public void setMaxValueDiscount(Long maxValueDiscount) {
        this.maxValueDiscount = maxValueDiscount;
    }

    public Long getMinDiscount() {
        return minDiscount;
    }

    public void setMinDiscount(Long minDiscount) {
        this.minDiscount = minDiscount;
    }

    public Long getMaxDiscount() {
        return maxDiscount;
    }

    public void setMaxDiscount(Long maxDiscount) {
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
        return "DiscountCustomer{" +
                "id='" + id + '\'' +
                ", customerTypeId='" + customerTypeId + '\'' +
                ", name='" + name + '\'' +
                ", discountValue=" + discountValue +
                ", minValueDiscount=" + minValueDiscount +
                ", maxValueDiscount=" + maxValueDiscount +
                ", minDiscount=" + minDiscount +
                ", maxDiscount=" + maxDiscount +
                ", startDay=" + startDay +
                ", endDay=" + endDay +
                ", status='" + status + '\'' +
                '}';
    }
}
