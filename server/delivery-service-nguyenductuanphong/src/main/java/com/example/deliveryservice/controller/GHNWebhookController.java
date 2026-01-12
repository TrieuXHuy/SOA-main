package com.example.deliveryservice.controller;

import com.example.deliveryservice.dto.GHNWebhookRequest;
import com.example.deliveryservice.service.DeliveryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ghn/webhook")
public class GHNWebhookController {

    private static final Logger log = LoggerFactory.getLogger(GHNWebhookController.class);

    @Autowired
    private DeliveryService deliveryService;

    @PostMapping("/callback")
    public ResponseEntity<?> handleWebhook(@RequestBody GHNWebhookRequest webhookRequest) {
        try {
            log.info("Received GHN webhook - Type: {}, OrderCode: {}, Status: {}", 
                webhookRequest.getType(), 
                webhookRequest.getOrderCode(),
                webhookRequest.getStatus());

            // Process webhook based on type
            deliveryService.processGHNWebhook(webhookRequest);

            // Always return 200 to acknowledge receipt
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error processing GHN webhook: {}", e.getMessage(), e);
            // Still return 200 to prevent GHN from retrying
            // In production, you might want to log to a dead letter queue instead
            return ResponseEntity.ok().build();
        }
    }
}

