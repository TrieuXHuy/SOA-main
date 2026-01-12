package com.example.orderservice.service;

import com.example.orderservice.model.ExportOrder;
import com.example.orderservice.repository.ExportOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ExportOrderService {

    @Autowired
    private WebClient webClient;

    @Autowired
    private ExportOrderRepository orderRepo;

    public List<ExportOrder> getAllOrders() {
        return orderRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<ExportOrder> getOrdersByUserId(String userID) {
        return orderRepo.findByUserID(userID, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public ExportOrder getOrderById(String orderID) {
        return orderRepo.findById(orderID)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderID));
    }

    public ExportOrder updateOrderStatus(String orderId, String status) {
        ExportOrder order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!status.equals("PENDING") && !status.equals("CONFIRMED") && !status.equals("CANCELLED")) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        order.setStatus(status);
        ExportOrder savedOrder = orderRepo.save(order);

        // If order is confirmed, create delivery
        if (status.equals("CONFIRMED")) {
            try {
                webClient.post()
                        .uri("http://localhost:8080/deliveries/create/" + orderId)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .block();
            } catch (Exception e) {
                // Log error but don't fail the order status update
                System.err.println("Failed to create delivery for order " + orderId + ": " + e.getMessage());
            }
        }

        return savedOrder;
    }

    public ExportOrder saveOrder(String userID, int totalPrice) {
        Map<String, Object> user = webClient.get()
                .uri("http://localhost:8080/users/" + userID)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (user == null) {
            throw new RuntimeException("Không tìm thấy thông tin người dùng với ID: " + userID);
        }

        ExportOrder order = new ExportOrder();
        order.setExportOrderID(UUID.randomUUID().toString());
        order.setUserID(userID);
        order.setFullName((String) user.get("fullName"));
        order.setEmail((String) user.get("email"));
        order.setPhoneNumber((String) user.get("phoneNumber"));
        order.setAddress((String) user.get("address"));
        order.setProductDiscountId("");
        order.setTotalPrice(totalPrice);
        order.setEndowID("");
        order.setPaymentId("");
        order.setCreatedAt(LocalDate.now());
        order.setStatus("PENDING");

        return orderRepo.save(order);
    }
}
