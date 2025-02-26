import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { WishlistService } from '../../../services/wishlist.service'; // Import WishlistService
import { Material } from '../../../models/material'; // Import Material model
import { CommonModule } from '@angular/common'; // Add this import
import { CartService } from '../../../services/cart.service';

declare var jQuery: any;

interface type {
  img: string,
  title: string,
  price: number,
  quantity: string
}
@Component({
    selector: 'app-shop-wishlist',
    imports: [
      CommonModule, // Add CommonModule here
        RouterLink,
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop-wishlist.component.html',
    styleUrl: './shop-wishlist.component.css'
})
export class ShopWishlistComponent {

  banner: any = {
    pagetitle: "Cart",
    bg_image: "assets/images/banner/bnr3.jpg",
    title: "Shop Cart",
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  wishlistItems: Material[] = []; // Array to hold wishlist items

  constructor(private wishlistService: WishlistService,    private router: Router // Inject Router
    , private cartService: CartService // Inject CartService
  ) { }
  trackById(index: number, item: Material): number {
    return item.id; // Use a unique identifier (e.g., item.id if available)
  }

  ngOnInit(): void {
    this.loadWishlistItems(); // Load wishlist items on component initialization

    setTimeout(() => {
      (function ($) {
        jQuery("input[name='demo_vertical2']").TouchSpin({
          verticalbuttons: true,
          verticalupclass: 'ti-plus',
          verticaldownclass: 'ti-minus'
        });
        jQuery('select').selectpicker();
      })(jQuery);
    }, 50);
  }
  // Load wishlist items from the service
  loadWishlistItems() {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  // Remove item from wishlist
  removeFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
    this.loadWishlistItems(); // Refresh the wishlist items
  }

  moveToCart(item: Material) {
    // Add the item to the cart
    this.cartService.addToCart(item);

    // Remove the item from the wishlist
    this.wishlistService.removeFromWishlist(item.id);

    // Refresh the wishlist items
    this.loadWishlistItems();
    this.router.navigate(['/front/shop-cart']);

  }
}
