package com.example.orderservice.controller;

import com.example.orderservice.model.ExportOrder;
import com.example.orderservice.service.ExportOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/export-orders")
public class ExportOrderController {

    @Autowired
    private ExportOrderService exportOrderService;

    @GetMapping
    public List<ExportOrder> getAllOrders() {
        return exportOrderService.getAllOrders();
    }

    @GetMapping("/by-id/{orderID}")
    public ExportOrder getOrderById(@PathVariable String orderID) {
        return exportOrderService.getOrderById(orderID);
    }

    @GetMapping("/{userID}")
    public List<ExportOrder> getOrdersByUserId(@PathVariable String userID) {
        return exportOrderService.getOrdersByUserId(userID);
    }

    @PostMapping
    public ExportOrder saveOrder(@RequestBody Map<String, Object> payload) {
        String userID = (String) payload.get("userId");
        
        // Handle totalPrice conversion safely (can be Integer, Double, or Number)
        Object totalPriceObj = payload.get("totalPrice");
        int totalPrice;
        if (totalPriceObj instanceof Integer) {
            totalPrice = (Integer) totalPriceObj;
        } else if (totalPriceObj instanceof Double) {
            totalPrice = ((Double) totalPriceObj).intValue();
        } else if (totalPriceObj instanceof Number) {
            totalPrice = ((Number) totalPriceObj).intValue();
        } else {
            throw new IllegalArgumentException("totalPrice must be a number");
        }
        
        return exportOrderService.saveOrder(userID, totalPrice);
    }

    @PutMapping("/{orderId}/status")
    public ExportOrder updateOrderStatus(
            @PathVariable String orderId,
            @RequestParam("status") String status
    ) {
        return exportOrderService.updateOrderStatus(orderId, status.toUpperCase());
    }

    @GetMapping("/status-count")
    public Map<String, Object> getOrderStatusCount() {
        List<ExportOrder> allOrders = exportOrderService.getAllOrders();

        long pending = allOrders.stream().filter(order -> "PENDING".equals(order.getStatus())).count();
        long confirmed = allOrders.stream().filter(order -> "CONFIRMED".equals(order.getStatus())).count();
        long completed = allOrders.stream().filter(order -> "CANCELLED".equals(order.getStatus())).count();

        Map<String, Object> result = new HashMap<>();
        result.put("total", allOrders.size());
        result.put("pending", pending);
        result.put("confirmed", confirmed);
        result.put("cancelled", completed);

        return result;
    }
}
