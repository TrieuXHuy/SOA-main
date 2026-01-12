package com.example.orderservice.repository;

import com.example.orderservice.model.ExportOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExportOrderRepository extends JpaRepository<ExportOrder, String> {
    List<ExportOrder> findByUserID(String userID, org.springframework.data.domain.Sort sort);
}