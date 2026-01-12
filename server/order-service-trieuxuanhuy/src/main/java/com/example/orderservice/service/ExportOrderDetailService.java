package com.example.orderservice.service;

import com.example.orderservice.model.ExportOrderDetail;
import com.example.orderservice.repository.ExportOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class ExportOrderDetailService {

    @Autowired
    private ExportOrderDetailRepository detailRepo;

    @Autowired
    private WebClient webClient;

    public List<ExportOrderDetail> getDetailsByExportOrderID(String exportOrderID) {
        return detailRepo.findByExportOrderID(exportOrderID);
    }

    public ExportOrderDetail saveOrderDetail(ExportOrderDetail detail) {
        // Save order detail first
        ExportOrderDetail savedDetail = detailRepo.save(detail);
        
        // Update product inventory: increase sold and decrease view (inventory)
        try {
            webClient.put()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("localhost")
                            .port(8080)
                            .path("/products/{productID}/inventory")
                            .queryParam("quantity", detail.getTotalItems())
                            .build(detail.getProductID()))
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();
        } catch (Exception e) {
            // Log error but don't fail the order detail save
            System.err.println("Failed to update product inventory for product " + detail.getProductID() + ": " + e.getMessage());
        }
        
        return savedDetail;
    }
}
