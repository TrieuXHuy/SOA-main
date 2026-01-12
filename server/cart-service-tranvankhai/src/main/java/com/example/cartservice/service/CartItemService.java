package com.example.cartservice.service;

import com.example.cartservice.model.CartItem;
import com.example.cartservice.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartItemService {

    @Autowired
    private WebClient webClient;

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartItem addToCart(String userID, String productID, int quantity) {
        Optional<CartItem> existingItemOpt = cartItemRepository.findByUserIDAndProductID(userID, productID);

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setTotalItems(existingItem.getTotalItems() + quantity);
            existingItem.setPriceUnit(existingItem.getExportPrice() * existingItem.getTotalItems());
            return cartItemRepository.save(existingItem);
        }

        Map<String, Object> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8080)
                        .path("/products/" + productID)
                        .build()
                )
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || !response.containsKey("data")) {
            throw new RuntimeException("Không thể lấy thông tin sản phẩm từ product-service");
        }

        Map<String, Object> data = (Map<String, Object>) response.get("data");

        CartItem cartItem = new CartItem();
        cartItem.setCartItemID(UUID.randomUUID().toString());
        cartItem.setUserID(userID);
        cartItem.setProductID((String) data.get("productID"));
        cartItem.setProductName((String) data.get("productName"));
        cartItem.setExportPrice(((Number) data.get("exportPrice")).intValue());
        cartItem.setSale(((Number) data.get("sale")).floatValue());
        cartItem.setImageUrl(((List<String>) data.get("images")).get(0));
        cartItem.setProductTypeID((String) data.get("productTypeID"));
        cartItem.setProductTypeName((String) data.get("productTypeName"));
        cartItem.setSupplierName((String) data.get("supplierName"));
        cartItem.setTotalItems(quantity);
        cartItem.setPriceUnit(cartItem.getExportPrice() * quantity);

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartByUserId(String userId) {
        return cartItemRepository.findByUserID(userId);
    }

    public boolean removeFromCart(String cartItemId) {
        Optional<CartItem> item = cartItemRepository.findById(cartItemId);
        if (item.isPresent()) {
            cartItemRepository.deleteById(cartItemId);
            return true;
        }
        return false;
    }

    public void clearCart(String userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserID(userId);
        cartItemRepository.deleteAll(cartItems);
    }

    public CartItem updateCartItemQuantity(String userID, String productID, int quantity) {
        Optional<CartItem> existingItemOpt = cartItemRepository.findByUserIDAndProductID(userID, productID);
        
        if (existingItemOpt.isEmpty()) {
            throw new RuntimeException("Cart item not found for user: " + userID + ", product: " + productID);
        }
        
        CartItem existingItem = existingItemOpt.get();
        existingItem.setTotalItems(quantity);
        existingItem.setPriceUnit(existingItem.getExportPrice() * quantity);
        
        return cartItemRepository.save(existingItem);
    }
}
