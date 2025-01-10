// cart.service.ts
// Import necessary Angular modules and RxJS functionality
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Mark this service as injectable and available throughout the app
@Injectable({
  providedIn: 'root',
})
// Base URL for the API endpoints
export class CartService {
  private apiUrl = 'http://localhost:8081/api';

// Inject the HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}


   /**
   * Fetches all items in the cart from the backend.
   * Makes a GET request to the '/cart-items' endpoint.
   * @returns An Observable containing the list of cart items.
   */
  // Get cart items from the database
  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart-items`);
  }


  /**
   * Adds an item to the cart.
   * Makes a POST request to the '/add-to-cart' endpoint with the item details.
   * @param item - The item to add to the cart, including properties like name, price, etc.
   * @returns An Observable containing the response from the server.
   */
  // Add item to cart
  addToCart(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-to-cart`, item);
  }


  /**
   * Updates the quantity or details of an item in the cart.
   * Makes a PUT request to the '/update-cart' endpoint with the updated item details.
   * @param item - The item to update, including its ID and updated properties.
   * @returns An Observable containing the response from the server.
   */
  // Update cart item quantity
  updateCart(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-cart`, item);
  }


  /**
   * Removes an item from the cart.
   * Makes a DELETE request to the '/remove-from-cart/{id}' endpoint.
   * @param item - The item to remove, including its ID.
   * @returns An Observable containing the response from the server.
   */
  // Remove item from cart
  removeFromCart(item: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-from-cart/${item.id}`);
  }
/**
   * Places an order by clearing all items in the cart.
   * Makes a POST request to the '/cart' endpoint.
   * @returns An Observable containing the response from the server.
   */
  
  placeOrder(): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/cart', {});
  }
}
