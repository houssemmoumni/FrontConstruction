import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
import { MaterialService } from '../../../services/material.service';
import { MaterialResponse } from '../../../models/material-response';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Material } from '../../../models/material';
import { MaterialStatus } from '../../../models/material-status';
import { WishlistService } from '../../../services/wishlist.service';
import { FormsModule } from '@angular/forms'; // <-- Add this import





interface type {
  img: string,
  title: string,
  offer_price: string,
  price: string,
  rating: number
}
@Component({
    selector: 'app-shop',
    imports: [
      CommonModule,  // <-- add this
      FormsModule, // <-- Add FormsModule here

        RouterLink,
        NgClass,
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  banner: any = {
    pagetitle: "Shop Grid 4",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Shop Grid 4",
  }
  materials: MaterialResponse[] = [];
  MaterialStatus = MaterialStatus; // Expose enum to template
  filteredMaterials: any[] = []; // Filtered materials array
  sortBy: string = 'none'; // Default sorting option
    searchText: any;



  constructor(private materialService: MaterialService,private cartService: CartService,  private router: Router,       private wishlistService: WishlistService // Correct injection
    // Inject WishlistService

  ) { }
  scroll_top() {
    window.scroll({
      behavior: 'smooth'
    });
  }
  products:type[] = [
    {
      img: 'assets/images/product/item1.jpg',
      title: 'School Bag',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item2.jpg',
      title: 'Color Pencils',
      offer_price: '232',
      price: '192',
      rating :2
    },
    {
      img: 'assets/images/product/item3.jpg',
      title: 'Pencils',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item4.jpg',
      title: 'Stapler',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item5.jpg',
      title: 'Project Book',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item6.jpg',
      title: 'Colorful Book',
      offer_price: '232',
      price: '192',
      rating :4
    },
    {
      img: 'assets/images/product/item7.jpg',
      title: 'Notebook',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item8.jpg',
      title: 'Project file',
      offer_price: '232',
      price: '192',
      rating :4
    },
    {
      img: 'assets/images/product/item9.jpg',
      title: 'Calculator',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item1.jpg',
      title: 'School Bag',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item2.jpg',
      title: 'Color Pencils',
      offer_price: '232',
      price: '192',
      rating :1
    },
    {
      img: 'assets/images/product/item3.jpg',
      title: 'Pencils',
      offer_price: '232',
      price: '192',
      rating :3
    },


  ]

  ngOnInit(): void {
this.loadMaterial()
this.filteredMaterials = this.materials; // Initialize filteredMaterials with all materials

}
filterMaterials(): void {
  if (!this.searchText) {
    this.filteredMaterials = this.materials;
  } else {
    this.filteredMaterials = this.materials.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

loadMaterial() {
  this.materialService.getAllMaterials().subscribe(data => {
    this.materials = data;
    this.filteredMaterials = data; // Update filteredMaterials with the fetched data

  });
}
trackById(index: number, item: MaterialResponse): number {
  return item.id;
}
addToCart(item: MaterialResponse) {
  const material: Material = {
    id: item.id,
    name: item.name,
    description: item.description,
    availableQuantity: item.availableQuantity,
    price: item.price,
    category: {
      id: 1, // Placeholder, update if category ID is available
      name: item.categoryName,
      description: '',
      materials: []
    },
    status: item.status ?? MaterialStatus.DISPONIBLE, // Default status if undefined
    createdBy: 1, // Placeholder, update if needed
    image: item.image
  };

  this.cartService.addToCart(material);
  console.log('Added to cart:', item);
  this.router.navigate(['/front/shop-cart']);



}
// Toggle item in wishlist
toggleWishlist(item: MaterialResponse) {
  if (this.isInWishlist(item.id)) {
    this.wishlistService.removeFromWishlist(item.id);
  } else {
    const material: Material = {
      id: item.id,
      name: item.name,
      description: item.description,
      availableQuantity: item.availableQuantity,
      price: item.price,
      category: {
        id: 1, // Placeholder, update if category ID is available
        name: item.categoryName,
        description: '',
        materials: [],
      },
      status: item.status ?? MaterialStatus.DISPONIBLE, // Default status if undefined
      createdBy: 1, // Placeholder, update if needed
      image: item.image,
    };
    this.wishlistService.addToWishlist(material);
  }
}
sortMaterials(): void {
  switch (this.sortBy) {
    case 'priceLowToHigh':
      this.filteredMaterials.sort((a, b) => a.price - b.price);
      break;
    case 'priceHighToLow':
      this.filteredMaterials.sort((a, b) => b.price - a.price);
      break;
    case 'nameAsc':
      this.filteredMaterials.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      this.filteredMaterials.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'status':
      this.filteredMaterials.sort((a, b) => a.status.localeCompare(b.status));
      break;
    default:
      // No sorting
      break;
  }
}
// Check if item is in wishlist
isInWishlist(itemId: number): boolean {
  return this.wishlistService.isInWishlist(itemId);
}

viewMaterialDetail(item: MaterialResponse) {
  // Navigate to the material detail page with the item's ID
  this.router.navigate(['/front/shop-product-details', item.id]);
}
}
