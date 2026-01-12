package com.example.deliveryservice.controller;

import com.example.deliveryservice.model.Delivery;
import com.example.deliveryservice.service.DeliveryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    private static final Logger log = LoggerFactory.getLogger(DeliveryController.class);

    @Autowired
    private DeliveryService deliveryService;

    @PostMapping("/create/{exportOrderID}")
    public ResponseEntity<?> createDelivery(@PathVariable String exportOrderID) {
        try {
            log.info("Creating delivery for order: {}", exportOrderID);
            Delivery delivery = deliveryService.createDelivery(exportOrderID);
            log.info("Delivery created successfully: {}", delivery.getDeliveryID());
            return ResponseEntity.status(HttpStatus.CREATED).body(delivery);
        } catch (Exception e) {
            log.error("Failed to create delivery for order {}: {}", exportOrderID, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/order/{exportOrderID}")
    public ResponseEntity<Delivery> getDeliveryByOrderId(@PathVariable String exportOrderID) {
        try {
            Delivery delivery = deliveryService.getDeliveryByOrderId(exportOrderID);
            return ResponseEntity.ok(delivery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        List<Delivery> deliveries = deliveryService.getAllDeliveries();
        return ResponseEntity.ok(deliveries);
    }
}

