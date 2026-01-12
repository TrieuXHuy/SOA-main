package com.example.inventoryservice.controller;

import com.example.inventoryservice.model.Inventory;
import com.example.inventoryservice.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventories")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @GetMapping("/{inventoryID}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable String inventoryID) {
        Optional<Inventory> inventory = inventoryService.getInventoryById(inventoryID);
        return inventory.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        Inventory created = inventoryService.createInventory(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{inventoryID}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable String inventoryID,
            @RequestBody Inventory inventory) {
        Optional<Inventory> existing = inventoryService.getInventoryById(inventoryID);
        if (existing.isPresent()) {
            Inventory updated = inventoryService.updateInventory(inventoryID, inventory);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{inventoryID}")
    public ResponseEntity<Void> deleteInventory(@PathVariable String inventoryID) {
        Optional<Inventory> existing = inventoryService.getInventoryById(inventoryID);
        if (existing.isPresent()) {
            inventoryService.deleteInventory(inventoryID);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
