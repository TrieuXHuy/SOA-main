package com.example.discountservice.controller;

import com.example.discountservice.model.DiscountOrder;
import com.example.discountservice.service.DiscountOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/discount-orders")
public class DiscountOrderController {

    @Autowired
    private DiscountOrderService discountOrderService;

    @GetMapping
    public List<DiscountOrder> getAllDiscountOrders() {
        return discountOrderService.getAllDiscountOrders();
    }

    @GetMapping("/{discountOrderID}")
    public ResponseEntity<DiscountOrder> getDiscountOrderById(@PathVariable String discountOrderID) {
        Optional<DiscountOrder> discountOrder = discountOrderService.getDiscountOrderById(discountOrderID);
        return discountOrder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<DiscountOrder> createDiscountOrder(@RequestBody DiscountOrder discountOrder) {
        DiscountOrder created = discountOrderService.createDiscountOrder(discountOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{discountOrderID}")
    public ResponseEntity<DiscountOrder> updateDiscountOrder(
            @PathVariable String discountOrderID,
            @RequestBody DiscountOrder discountOrder) {
        Optional<DiscountOrder> existing = discountOrderService.getDiscountOrderById(discountOrderID);
        if (existing.isPresent()) {
            DiscountOrder updated = discountOrderService.updateDiscountOrder(discountOrderID, discountOrder);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{discountOrderID}")
    public ResponseEntity<Void> deleteDiscountOrder(@PathVariable String discountOrderID) {
        Optional<DiscountOrder> existing = discountOrderService.getDiscountOrderById(discountOrderID);
        if (existing.isPresent()) {
            discountOrderService.deleteDiscountOrder(discountOrderID);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
