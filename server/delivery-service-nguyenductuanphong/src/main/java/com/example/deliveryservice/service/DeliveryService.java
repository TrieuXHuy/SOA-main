package com.example.deliveryservice.service;

import com.example.deliveryservice.dto.*;
import com.example.deliveryservice.model.Delivery;
import com.example.deliveryservice.repository.DeliveryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class DeliveryService {

    private static final Logger log = LoggerFactory.getLogger(DeliveryService.class);

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private GHNService ghnService;

    @Autowired
    private WebClient webClient;

    public Delivery createDelivery(String exportOrderID) {
        log.info("Starting delivery creation for order: {}", exportOrderID);
        
        // Check if delivery already exists
        Optional<Delivery> existingDelivery = deliveryRepository.findByExportOrderID(exportOrderID);
        if (existingDelivery.isPresent()) {
            log.warn("Delivery already exists for order: {}", exportOrderID);
            throw new RuntimeException("Delivery already exists for order: " + exportOrderID);
        }

        // Fetch order from order-service
        log.info("Fetching order from order-service: {}", exportOrderID);
        Map<String, Object> order;
        try {
            order = webClient.get()
                    .uri("http://localhost:8080/export-orders/by-id/{orderId}", exportOrderID)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();
        } catch (WebClientResponseException e) {
            log.error("Failed to fetch order {}: HTTP {} - {}", exportOrderID, e.getStatusCode(), e.getMessage());
            throw new RuntimeException("Failed to fetch order from order-service: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error fetching order {}: {}", exportOrderID, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch order: " + e.getMessage(), e);
        }

        if (order == null) {
            log.error("Order not found: {}", exportOrderID);
            throw new RuntimeException("Order not found: " + exportOrderID);
        }
        log.info("Order fetched successfully: {}", exportOrderID);

        // Fetch order details
        log.info("Fetching order details for order: {}", exportOrderID);
        List<Map<String, Object>> orderDetails;
        try {
            orderDetails = webClient.get()
                    .uri("http://localhost:8080/export-order-details/{orderId}", exportOrderID)
                    .retrieve()
                    .bodyToFlux(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .collectList()
                    .block();
        } catch (WebClientResponseException e) {
            log.error("Failed to fetch order details {}: HTTP {} - {}", exportOrderID, e.getStatusCode(), e.getMessage());
            throw new RuntimeException("Failed to fetch order details from order-service: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error fetching order details {}: {}", exportOrderID, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch order details: " + e.getMessage(), e);
        }

        if (orderDetails == null || orderDetails.isEmpty()) {
            log.error("Order details not found for order: {}", exportOrderID);
            throw new RuntimeException("Order details not found for order: " + exportOrderID);
        }
        log.info("Order details fetched successfully: {} items", orderDetails.size());

        // Build GHN request
        log.info("Building GHN request for order: {}", exportOrderID);
        GHNCreateOrderRequest ghnRequest = buildGHNRequest(order, orderDetails);

        // Call GHN API
        log.info("Calling GHN API for order: {}", exportOrderID);
        GHNCreateOrderResponse ghnResponse;
        try {
            ghnResponse = ghnService.createOrder(ghnRequest);
            log.info("GHN API call successful. Order code: {}", ghnResponse.getData().getOrder_code());
        } catch (Exception e) {
            log.error("Failed to create GHN order: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create GHN order: " + e.getMessage(), e);
        }

        // Save delivery to database
        log.info("Saving delivery to database for order: {}", exportOrderID);
        Delivery delivery = new Delivery();
        delivery.setDeliveryID(UUID.randomUUID().toString());
        delivery.setExportOrderID(exportOrderID);
        delivery.setGhnOrderCode(ghnResponse.getData().getOrder_code());
        delivery.setSortCode(ghnResponse.getData().getSort_code());
        delivery.setExpectedDeliveryTime(ghnResponse.getData().getExpected_delivery_time());
        delivery.setTotalFee(Integer.parseInt(ghnResponse.getData().getTotal_fee()));
        delivery.setTransType(ghnResponse.getData().getTrans_type());
        delivery.setStatus("CREATED");
        delivery.setCreatedAt(LocalDateTime.now());
        delivery.setUpdatedAt(LocalDateTime.now());

        Delivery savedDelivery = deliveryRepository.save(delivery);
        log.info("Delivery saved successfully: {}", savedDelivery.getDeliveryID());
        return savedDelivery;
    }

    private GHNCreateOrderRequest buildGHNRequest(Map<String, Object> order, List<Map<String, Object>> orderDetails) {
        GHNCreateOrderRequest request = new GHNCreateOrderRequest();

        // Payment type: 1 = Shop pays, 2 = Buyer pays
        request.setPayment_type_id(2);

        // Required note
        request.setRequired_note("KHONGCHOXEMHANG");

        // From (Shop) information - using default shop info
        // Note: from_province_name should be "HCM" not "Hồ Chí Minh" according to GHN API
        request.setFrom_name("Shop Name");
        request.setFrom_phone("0987654321");
        request.setFrom_address("72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam");
        request.setFrom_ward_name("Phường 14");
        request.setFrom_district_name("Quận 10");
        request.setFrom_province_name("HCM");

        // Return information
        request.setReturn_phone("0987654321");
        request.setReturn_address("72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam");
        request.setReturn_district_id(null);
        request.setReturn_ward_code("");

        // Client order code
        request.setClient_order_code(order.get("exportOrderID").toString());

        // To (Customer) information
        request.setTo_name(order.get("fullName") != null ? order.get("fullName").toString() : "");
        request.setTo_phone(order.get("phoneNumber") != null ? order.get("phoneNumber").toString() : "");
        
        // Parse address to extract province, district, ward
        // Note: For now, using default HCM address from example to avoid Google API conversion issues
        // TODO: Implement proper address parsing or use GHN API to get ward_code and district_id
        String address = order.get("address") != null ? order.get("address").toString() : "";
        
        // For testing: Use default HCM address from example
        // In production, should parse address or get ward_code/district_id from GHN API
        request.setTo_address("72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam");
        request.setTo_province_name("HCM");
        request.setTo_district_name("Quận 10");
        request.setTo_ward_name("Phường 14");
        // Using ward_code and district_id from example (required by GHN API)
        request.setTo_ward_code("20308");
        request.setTo_district_id(1444);
        
        log.warn("Using default HCM address for delivery. Original address: {}", address);

        // COD amount
        request.setCod_amount(order.get("totalPrice") != null ? (Integer) order.get("totalPrice") : 0);

        // Content
        request.setContent("Order " + order.get("exportOrderID"));

        // Calculate total weight and dimensions from order details
        int totalWeight = 0;
        int maxLength = 0;
        int maxWidth = 0;
        int totalHeight = 0; // Total height when items are stacked
        final int MAX_HEIGHT_CM = 150; // GHN maximum height limit

        List<GHNItem> items = new ArrayList<>();
        for (Map<String, Object> detail : orderDetails) {
            GHNItem item = new GHNItem();
            item.setName(detail.get("productName") != null ? detail.get("productName").toString() : "Product");
            item.setCode(detail.get("productID") != null ? detail.get("productID").toString() : "");
            item.setQuantity(detail.get("totalItems") != null ? (Integer) detail.get("totalItems") : 1);
            item.setPrice(detail.get("priceUnit") != null ? (Integer) detail.get("priceUnit") : 0);

            // Default dimensions per item (can be enhanced to get from product service)
            int itemLength = 12;
            int itemWidth = 12;
            int itemHeight = 12;
            int itemWeight = 200; // grams per item

            item.setLength(itemLength);
            item.setWidth(itemWidth);
            item.setHeight(itemHeight);
            item.setWeight(itemWeight * item.getQuantity());

            // Category
            GHNCategory category = new GHNCategory();
            category.setLevel1("Sản phẩm");
            item.setCategory(category);

            items.add(item);

            totalWeight += item.getWeight();
            maxLength = Math.max(maxLength, itemLength);
            maxWidth = Math.max(maxWidth, itemWidth);
            // Calculate total height when stacking items, but don't exceed reasonable limit
            totalHeight += itemHeight * item.getQuantity();
        }

        request.setItems(items);
        request.setWeight(Math.max(totalWeight, 200)); // Minimum 200g
        request.setLength(Math.max(maxLength, 1));
        request.setWidth(Math.max(maxWidth, 1));
        // Cap height at GHN maximum limit (150cm) to avoid API rejection
        // If total height exceeds limit, use a reasonable estimate based on volume
        int finalHeight = Math.min(totalHeight, MAX_HEIGHT_CM);
        // Ensure minimum height of 10cm
        request.setHeight(Math.max(finalHeight, 10));

        // Service type: 2 = E-commerce Delivery
        request.setService_type_id(2);
        request.setService_id(0);

        // Pick shift
        request.setPick_shift(Arrays.asList(2));

        // Insurance value
        request.setInsurance_value(order.get("totalPrice") != null ? (Integer) order.get("totalPrice") : 0);

        // Pick station (optional) - set to null if not using station pickup
        // Note: If pick_station_id is set, it should be > 0
        request.setPick_station_id(null);
        request.setDeliver_station_id(null);

        // Coupon
        request.setCoupon(null);

        // Note
        request.setNote("Vui lòng gọi trước khi giao hàng");

        return request;
    }

    public Delivery getDeliveryByOrderId(String exportOrderID) {
        return deliveryRepository.findByExportOrderID(exportOrderID)
                .orElseThrow(() -> new RuntimeException("Delivery not found for order: " + exportOrderID));
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public void processGHNWebhook(GHNWebhookRequest webhookRequest) {
        log.info("Processing GHN webhook: Type={}, OrderCode={}, ClientOrderCode={}, Status={}", 
            webhookRequest.getType(),
            webhookRequest.getOrderCode(),
            webhookRequest.getClientOrderCode(),
            webhookRequest.getStatus());

        // Find delivery by GHN order code or client order code
        Delivery delivery = null;
        
        if (webhookRequest.getOrderCode() != null && !webhookRequest.getOrderCode().isEmpty()) {
            delivery = deliveryRepository.findByGhnOrderCode(webhookRequest.getOrderCode())
                .orElse(null);
        }
        
        if (delivery == null && webhookRequest.getClientOrderCode() != null && !webhookRequest.getClientOrderCode().isEmpty()) {
            delivery = deliveryRepository.findByExportOrderID(webhookRequest.getClientOrderCode())
                .orElse(null);
        }

        if (delivery == null) {
            log.warn("Delivery not found for webhook - OrderCode: {}, ClientOrderCode: {}", 
                webhookRequest.getOrderCode(), webhookRequest.getClientOrderCode());
            return;
        }

        // Update delivery based on webhook type
        switch (webhookRequest.getType()) {
            case "Create":
                log.info("Order created: {}", webhookRequest.getOrderCode());
                delivery.setStatus("CREATED");
                break;
                
            case "Switch_status":
                // Update status based on GHN status
                if (webhookRequest.getStatus() != null) {
                    String status = mapGHNStatusToDeliveryStatus(webhookRequest.getStatus(), webhookRequest.getStatusName());
                    delivery.setStatus(status);
                    log.info("Status changed to: {} for order: {}", status, webhookRequest.getOrderCode());
                }
                break;
                
            case "Update_weight":
                log.info("Weight updated: {}g for order: {}", webhookRequest.getWeight(), webhookRequest.getOrderCode());
                // Weight update doesn't change delivery status, but you can log it
                break;
                
            case "Update_cod":
                if (webhookRequest.getCODAmount() != null) {
                    // COD amount updated
                    log.info("COD amount updated: {} for order: {}", webhookRequest.getCODAmount(), webhookRequest.getOrderCode());
                }
                break;
                
            case "Update_fee":
                if (webhookRequest.getFee() != null) {
                    delivery.setTotalFee(webhookRequest.getFee());
                    log.info("Fee updated: {} for order: {}", webhookRequest.getFee(), webhookRequest.getOrderCode());
                }
                break;
                
            default:
                log.warn("Unknown webhook type: {}", webhookRequest.getType());
        }

        // Update expected delivery time if provided
        if (webhookRequest.getTime() != null && !webhookRequest.getTime().isEmpty()) {
            delivery.setExpectedDeliveryTime(webhookRequest.getTime());
        }

        delivery.setUpdatedAt(LocalDateTime.now());
        deliveryRepository.save(delivery);
        
        log.info("Delivery updated successfully for order: {}", webhookRequest.getOrderCode());
    }

    private String mapGHNStatusToDeliveryStatus(Integer ghnStatus, String statusName) {
        // Map GHN status codes to delivery status
        // Common GHN statuses:
        // 1: Ready to Pick
        // 2: Picking
        // 3: Storing
        // 4: Delivering
        // 5: Delivered
        // 6: Return
        // 7: Cancel
        
        if (ghnStatus == null) {
            return "UNKNOWN";
        }
        
        switch (ghnStatus) {
            case 1:
                return "READY_TO_PICK";
            case 2:
                return "PICKING";
            case 3:
                return "STORING";
            case 4:
                return "DELIVERING";
            case 5:
                return "DELIVERED";
            case 6:
                return "RETURNED";
            case 7:
                return "CANCELLED";
            default:
                // Use status name if available, otherwise use status code
                return statusName != null ? statusName.toUpperCase().replace(" ", "_") : "STATUS_" + ghnStatus;
        }
    }
}

