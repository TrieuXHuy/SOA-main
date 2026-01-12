package com.example.discountservice.repository;

import com.example.discountservice.model.DiscountCustomer;
import com.example.discountservice.model.DiscountOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountCustomerRepository extends JpaRepository<DiscountCustomer, String> {}
