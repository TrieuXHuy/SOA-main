package com.example.orderservice.repository;

import com.example.orderservice.model.ExportOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExportOrderDetailRepository extends JpaRepository<ExportOrderDetail, String> {
    List<ExportOrderDetail> findByExportOrderID(String exportOrderID);
}