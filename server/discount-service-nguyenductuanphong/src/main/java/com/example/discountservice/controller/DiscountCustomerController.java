package com.example.discountservice.controller;

import com.example.discountservice.model.DiscountCustomer;
import com.example.discountservice.service.DiscountCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/discount-customers")
public class DiscountCustomerController {

    @Autowired
    private DiscountCustomerService discountCustomerService;

    @GetMapping
    public List<DiscountCustomer> getAllDiscountCustomers() {
        return discountCustomerService.getAllDiscountCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscountCustomer> getDiscountCustomerById(@PathVariable String id) {
        Optional<DiscountCustomer> discountCustomer = discountCustomerService.getDiscountCustomerById(id);
        return discountCustomer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<DiscountCustomer> createDiscountCustomer(@RequestBody DiscountCustomer discountCustomer) {
        DiscountCustomer created = discountCustomerService.createDiscountCustomer(discountCustomer);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountCustomer> updateDiscountCustomer(
            @PathVariable String id,
            @RequestBody DiscountCustomer discountCustomer) {
        Optional<DiscountCustomer> existing = discountCustomerService.getDiscountCustomerById(id);
        if (existing.isPresent()) {
            DiscountCustomer updated = discountCustomerService.updateDiscountCustomer(id, discountCustomer);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscountCustomer(@PathVariable String id) {
        Optional<DiscountCustomer> existing = discountCustomerService.getDiscountCustomerById(id);
        if (existing.isPresent()) {
            discountCustomerService.deleteDiscountCustomer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
