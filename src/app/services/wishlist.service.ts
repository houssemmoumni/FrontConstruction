import { Injectable } from '@angular/core';
import { Material } from '../models/material';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_KEY = 'wishlist';
  wishlistItems: Material[] = localStorage.getItem(this.WISHLIST_KEY)
    ? JSON.parse(localStorage.getItem(this.WISHLIST_KEY)!)
    : [];

  constructor() { }
  addToWishlist(item: Material) {
    if (!this.isInWishlist(item.id)) {
      this.wishlistItems.push(item);
      this.saveWishlist();
    }
  }
  removeFromWishlist(itemId: number) {
    this.wishlistItems = this.wishlistItems.filter((item) => item.id !== itemId);
    this.saveWishlist();
  }

  // Check if item is in wishlist
  isInWishlist(itemId: number): boolean {
    return this.wishlistItems.some((item) => item.id === itemId);
  }

  // Save wishlist to local storage
  private saveWishlist() {
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(this.wishlistItems));
  }

  // Get all wishlist items
  getWishlistItems(): Material[] {
    return this.wishlistItems;
  }
}
