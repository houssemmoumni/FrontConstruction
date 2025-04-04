import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';
  cartItems: CartItem[] = localStorage.getItem(this.CART_KEY)
  ? JSON.parse(localStorage.getItem(this.CART_KEY)!)
  : [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor() { if (typeof window !== 'undefined' && localStorage.getItem(this.CART_KEY)) {
    this.cartItems = JSON.parse(localStorage.getItem(this.CART_KEY)!);
  }
 }
 
  addToCart(material: Material) {
    const existingItem = this.cartItems.find((item) => item.material.id === material.id);

    if (existingItem) {
      existingItem.quantity++; // Increment quantity if item already exists
    } else {
      this.cartItems.push({ material, quantity: 1 }); // Add new item to cart
    }

    this.saveCart();
    this.computeCartTotals();
  }

  removeFromCart(materialId: number) {
    this.cartItems = this.cartItems.filter((item) => item.material.id !== materialId);
    this.saveCart();
    this.computeCartTotals();
  }

  // Update material quantity
  updateQuantity(materialId: number, quantity: number) {
    const item = this.cartItems.find((item) => item.material.id === materialId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.computeCartTotals();
    }
  }

  // Save cart to local storage
  private saveCart() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
    }
  }

  // Compute total price and quantity
  computeCartTotals() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.material.price * item.quantity,
      0
    );
    this.totalQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Clear cart
  clearCart() {
    this.cartItems = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.CART_KEY);
    }
    this.computeCartTotals();
  }
  decrementQuantity(item: CartItem) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.material.id === item.material.id
    );
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        // If quantity becomes zero, remove the item
      }
      this.saveCart();
      this.computeCartTotals();
    }
  }
}