package com.example.inventoryservice.service;

import com.example.inventoryservice.model.Inventory;
import com.example.inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(String inventoryID) {
        return inventoryRepository.findById(inventoryID);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(String inventoryID, Inventory inventory) {
        inventory.setInventoryID(inventoryID);
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(String inventoryID) {
        inventoryRepository.deleteById(inventoryID);
    }
}
