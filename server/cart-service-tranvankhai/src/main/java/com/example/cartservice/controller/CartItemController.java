package com.example.cartservice.controller;

import com.example.cartservice.model.CartItem;
import com.example.cartservice.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carts")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public CartItem addToCart(@RequestParam String userID, @RequestParam String productID, @RequestParam int quantity) {
        return cartItemService.addToCart(userID, productID, quantity);
    }

    @GetMapping("/{userId}")
    public List<CartItem> getUserCart(@PathVariable String userId) {
        return cartItemService.getCartByUserId(userId);
    }

    @DeleteMapping("/{cartItemId}")
    public void removeCartItem(@PathVariable String cartItemId) {
        cartItemService.removeFromCart(cartItemId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable String userId) {
        cartItemService.clearCart(userId);
    }

    @PutMapping("/{productID}")
    public CartItem updateCartItemQuantity(
            @PathVariable String productID,
            @RequestBody Map<String, Object> requestBody) {
        String userID = (String) requestBody.get("userID");
        Object quantityObj = requestBody.get("quantity");
        int quantity;
        if (quantityObj instanceof Integer) {
            quantity = (Integer) quantityObj;
        } else if (quantityObj instanceof Number) {
            quantity = ((Number) quantityObj).intValue();
        } else {
            throw new IllegalArgumentException("quantity must be a number");
        }
        return cartItemService.updateCartItemQuantity(userID, productID, quantity);
    }
}
