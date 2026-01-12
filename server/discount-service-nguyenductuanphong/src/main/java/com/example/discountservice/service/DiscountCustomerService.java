package com.example.discountservice.service;

import com.example.discountservice.model.DiscountCustomer;
import com.example.discountservice.repository.DiscountCustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountCustomerService {

    @Autowired
    private DiscountCustomerRepository discountCustomerRepository;

    public List<DiscountCustomer> getAllDiscountCustomers() {
        return discountCustomerRepository.findAll();
    }

    public Optional<DiscountCustomer> getDiscountCustomerById(String id) {
        return discountCustomerRepository.findById(id);
    }

    public DiscountCustomer createDiscountCustomer(DiscountCustomer discountCustomer) {
        return discountCustomerRepository.save(discountCustomer);
    }

    public DiscountCustomer updateDiscountCustomer(String id, DiscountCustomer discountCustomer) {
        discountCustomer.setId(id);
        return discountCustomerRepository.save(discountCustomer);
    }

    public void deleteDiscountCustomer(String id) {
        discountCustomerRepository.deleteById(id);
    }
}
