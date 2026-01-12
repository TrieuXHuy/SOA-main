package com.example.deliveryservice.service;

import com.example.deliveryservice.dto.GHNCreateOrderRequest;
import com.example.deliveryservice.dto.GHNCreateOrderResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class GHNService {

    private static final Logger log = LoggerFactory.getLogger(GHNService.class);

    @Value("${ghn.api.url}")
    private String ghnApiUrl;

    @Value("${ghn.api.token}")
    private String ghnToken;

    @Value("${ghn.api.shop-id}")
    private String ghnShopId;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public GHNService() {
        this.webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public GHNCreateOrderResponse createOrder(GHNCreateOrderRequest request) {
        try {
            // Log configuration (show full values for debugging - remove in production)
            log.info("GHN API Config - URL: {}, ShopId: {}, Token: {}", ghnApiUrl, ghnShopId, ghnToken);
            
            // Validate configuration
            if (ghnToken == null || ghnToken.isEmpty()) {
                throw new RuntimeException("GHN Token is not configured");
            }
            if (ghnShopId == null || ghnShopId.isEmpty()) {
                throw new RuntimeException("GHN ShopId is not configured");
            }
            
            // Log request for debugging
            try {
                String requestJson = objectMapper.writeValueAsString(request);
                log.info("GHN API Request: {}", requestJson);
            } catch (Exception e) {
                log.warn("Failed to serialize request for logging: {}", e.getMessage());
            }

            GHNCreateOrderResponse response = webClient.post()
                    .uri(ghnApiUrl)
                    .header("Token", ghnToken)
                    .header("ShopId", ghnShopId)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(GHNCreateOrderResponse.class)
                    .block();

            if (response == null || response.getCode() == null || response.getCode() != 200) {
                log.error("GHN API returned error: code={}, message={}", 
                    response != null ? response.getCode() : "null",
                    response != null ? response.getMessage() : "null");
                throw new RuntimeException("GHN API error: " + (response != null ? response.getMessage() : "Unknown error"));
            }

            log.info("GHN API success: order_code={}", response.getData() != null ? response.getData().getOrder_code() : "null");
            return response;
        } catch (WebClientResponseException e) {
            // Log the response body from GHN API
            String responseBody = e.getResponseBodyAsString();
            log.error("GHN API error - Status: {}, Response: {}", e.getStatusCode(), responseBody);
            
            // Provide more helpful error message
            String errorMessage = "GHN API error: " + e.getStatusCode();
            if (responseBody != null && responseBody.contains("shop")) {
                errorMessage += " - Có thể Token hoặc ShopId không đúng. Vui lòng kiểm tra lại cấu hình.";
            } else {
                errorMessage += " - " + responseBody;
            }
            
            throw new RuntimeException(errorMessage, e);
        } catch (Exception e) {
            log.error("Failed to create GHN order: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create GHN order: " + e.getMessage(), e);
        }
    }
}

