import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
declare  var jQuery:  any;
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { MaterialService } from '../../../services/material.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';




@Component({
    selector: 'app-shop-cart',
    standalone: true,  // <-- Ensure this is present
    imports: [
      CommonModule, // <-- this is required
      HttpClientModule, // <-- Import HttpClientModule if needed
      NgClass,
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop-cart.component.html',
    styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent implements OnInit {

	banner : any = {
		pagetitle: "Cart",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Shop Cart",
	};
  cartItems: CartItem[] = []; // Array to hold cart items
  totalPrice: number = 0; // Total price of the cart
  totalQuantity: number = 0; // Total quantity of items in the cart
 
  constructor(private cartService: CartService,    private materialService: MaterialService // Inject MaterialService
  ) { }

  ngOnInit(): void {
    this.loadCart(); // Load cart items on component initialization

    setTimeout(() => {
      (function ($) {
			jQuery("input[name='demo_vertical2']").TouchSpin({
			  verticalbuttons: true,
			  verticalupclass: 'ti-plus',
			  verticaldownclass: 'ti-minus'
			});
			jQuery('select').selectpicker();
		})(jQuery);
    }, 100);
	}
  loadCart() {
    this.cartItems = this.cartService.cartItems;
    this.totalPrice = this.cartService.totalPrice;
    this.totalQuantity = this.cartService.totalQuantity;
    this.cartService.computeCartTotals(); // Recalculate totals
  }
  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item.material);
  }

  // Decrement item quantity
  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
  }
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.material.id);
    this.cartItems = this.cartService.cartItems; // Update the local cartItems array

  }

  // Proceed to checkout
  checkout() {
    const purchaseRequests = this.cartItems.map((item) => ({
      materialId: item.material.id,
      quantity: item.quantity,
    }));

    // Send cart items to the backend for processing
    this.materialService.purchaseMaterials(purchaseRequests).subscribe(
      (response) => {
        console.log('Purchase successful:', response);
        this.cartService.clearCart(); // Clear the cart after checkout
      },
      (error) => {
        console.error('Purchase failed:', error);
      }
    );
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  trackByMaterialId(index: number, item: CartItem): number {
    return item?.material?.id ?? index; // Fallback to index if undefined
  }
}
