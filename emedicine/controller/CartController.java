package com.example.emedicine.controller;
import com.example.emedicine.model.CartItem;
import com.example.emedicine.repository.CartItemRepository;
import com.example.emedicine.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")

public class CartController {
	private final CartItemRepository cartItemRepository;

    private final CartService cartService;
    public CartController(CartService cartService,CartItemRepository cartItemRepository) {
        this.cartService = cartService;
        this.cartItemRepository = cartItemRepository;
    }

    
    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    @PostMapping
    public CartItem addCartItem(@RequestBody CartItem cartItem) {
        return cartService.addCartItem(cartItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok("Item removed from cart successfully.");
    }
    
}
