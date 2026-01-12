package com.example.discountservice.service;

import com.example.discountservice.model.DiscountOrder;
import com.example.discountservice.repository.DiscountOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountOrderService {

    @Autowired
    private DiscountOrderRepository discountOrderRepository;

    public List<DiscountOrder> getAllDiscountOrders() {
        return discountOrderRepository.findAll();
    }

    public Optional<DiscountOrder> getDiscountOrderById(String discountOrderID) {
        return discountOrderRepository.findById(discountOrderID);
    }

    public DiscountOrder createDiscountOrder(DiscountOrder discountOrder) {
        return discountOrderRepository.save(discountOrder);
    }

    public DiscountOrder updateDiscountOrder(String discountOrderID, DiscountOrder discountOrder) {
        discountOrder.setDiscountOrderID(discountOrderID);
        return discountOrderRepository.save(discountOrder);
    }

    public void deleteDiscountOrder(String discountOrderID) {
        discountOrderRepository.deleteById(discountOrderID);
    }
}
