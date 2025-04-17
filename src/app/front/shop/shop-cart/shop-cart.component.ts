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

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { OrderService } from '../../../services/order.service';
import { ChargeRequest } from '../../../models/charge-request';
import { Material } from '../../../models/material';
import { OrderRequest, PaymentMethod } from '../../../models/order-request';
import { PurchaseRequest } from '../../../models/purchase-request';



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
  showPaymentDetails: boolean = false; // Initially hidden
  totalQuantity: number = 0; // Total quantity of items in the cart
  stripe: Stripe | null = null;
  card: any;
  price: number = 0
  material: PurchaseRequest[] = [];
  constructor(private cartService: CartService,    private materialService: MaterialService , private orderService: OrderService, private paymentService: PaymentService,
  ) { }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51QwpSRRrmrj6M3HuRTR4Lav7Os5WXi5PYLH9ghUd3AUnR9XszaBNEkgfBSSXmy9FqLC0pp8G7guEpvjD1g5Kb9QF00yWR7qQRq');

    const elements = this.stripe?.elements();
    this.card = elements?.create('card');
    this.card.mount('#card-element');
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

    this.material = [];
    this.price = 0;
    for (let cart of this.cartItems){
      this.price = this.price + cart.material.price * cart.quantity
      this.material.push({materialId: cart.material.id, quantity: cart.quantity})
    }
    console.log(this.price)
  }
  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item.material);
    this.loadCart(); // Ensure the total updates dynamically
  }

  // Decrement item quantity
  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
    this.loadCart(); // Ensure the total updates dynamically

  }
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.material.id);
    this.cartItems = this.cartService.cartItems; // Update the local cartItems array
    this.loadCart(); // Ensure the total updates dynamically


  }
  togglePaymentDetails() {
    this.showPaymentDetails = true;
  }

  // Proceed to checkout
  checkout() {
    const purchaseRequests = this.cartItems.map((item) => ({
      materialId: item.material.id,
      quantity: item.quantity,
    }));
const material = this.material
const price = this.price
   const order: OrderRequest = {
      //reference: "ref",
        amount: price,
        paymentMethod: PaymentMethod.CREDIT_CARD,
        customerId: 1,
        materials: material
   }
   this.orderService.createOrder(order).subscribe(
      (response) => {
        console.log('Order created:', response);

        this.cartService.clearCart(); // Clear the cart
      })
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

  async handlePayment() {
    if (this.stripe) {
    // Create a payment method using Stripe
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,

    });

    if (error) {
      console.error('Error creating payment method:', error);
      alert('Payment failed: ' + error.message); // Notify the user
      return;
    }
    console.log(this.price)
    // Prepare the payment request
    const paymentRequest: ChargeRequest = {
      amount: this.price,
      currency: 'usd', // Currency code
      paymentMethodId: paymentMethod.id, // Stripe payment method ID
       // Convert to cents (Stripe expects amounts in cents)

    };



    // Call the PaymentService to process the payment
    this.paymentService.createPayment(paymentRequest).subscribe(
      (response) => {
        console.log('Payment successful:', response);
        alert('Payment successful!'); // Notify the user

        // Proceed to checkout (create an order)
        this.checkout();
      },
      (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed: ' + error.message); // Notify the user
      }
    );
  }
  }
}
