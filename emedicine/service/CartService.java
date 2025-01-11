package com.example.emedicine.service;
import com.example.emedicine.model.CartItem;
import com.example.emedicine.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CartService {
private final CartItemRepository cartItemRepository;

    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem addCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}
