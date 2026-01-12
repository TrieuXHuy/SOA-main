package com.example.deliveryservice.repository;

import com.example.deliveryservice.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, String> {
    Optional<Delivery> findByExportOrderID(String exportOrderID);
    Optional<Delivery> findByGhnOrderCode(String ghnOrderCode);
}

