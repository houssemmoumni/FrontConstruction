import { Component, OnInit } from '@angular/core';
import { TotalSalesComponent } from './total-sales/total-sales.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { TotalCustomersComponent } from './total-customers/total-customers.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { TopSellersComponent } from './top-sellers/top-sellers.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RevenueComponent } from './revenue/revenue.component';
import { TopSalesLocationsComponent } from './top-sales-locations/top-sales-locations.component';
import { AverageDailySalesComponent } from './average-daily-sales/average-daily-sales.component';
import { ProfitComponent } from './profit/profit.component';
import { BestSellerOfTheMonthComponent } from './best-seller-of-the-month/best-seller-of-the-month.component';
import { NewCustomersThisMonthComponent } from './new-customers-this-month/new-customers-this-month.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../Modules/UserModule/User';
import { UserServiceService } from '../../UserService/user-service.service';
import { KeycloakService } from '../../keycloak.service';



@Component({
  selector: 'app-ecommerce',
  standalone: true,

  imports: [CommonModule, RouterModule],
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  message: string = '';
  userRole: string = '';

  username: string = '';
  welcome: string = "Welcome to the back office";
  userList: User[] = [];
  email: string = '';
  idUser: number = 0;
  sidebarExpanded = true;

  constructor(
    private UserService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private keycloakService: KeycloakService,
  ) {}

  async ngOnInit() {
    const isReady = await this.waitForKeycloakReady();
    if (isReady) {
      this.UserService.getUsers().subscribe(users => {
        this.userList = users;
        
      });
  
      await this.getCurrentUser(); // 🔐 now it will work
      this.registerAllUsersFromKeycloak();
      this.userRole = this.UserService.getPredefinedRole();
      console.log("🔑 Detected user role:", this.userRole);

    } else {
      console.warn("⏳ Keycloak not ready yet...");
    }
  }
  async waitForKeycloakReady(): Promise<boolean> {
    let retries = 5;
    while (retries--) {
      if (this.UserService['keycloak']?.authenticated) return true;
      await new Promise(res => setTimeout(res, 300)); // wait 300ms
    }
    return false;
  }
  
  

  async getCurrentUser() {
    if (!this.keycloakService.isAuthenticated()) {
      console.warn('⚠ User not authenticated yet');
      return;
    }
  
    try {
      const userInfo = await this.UserService.getCurrentUser();
      this.username = userInfo.preferred_username;
      this.email = userInfo.email;
  
      console.log('👤 Current user from Keycloak:', userInfo);
      console.log('📧 Email:', this.email);
    } catch (error) {
      console.error("🚨 Error getting Keycloak user info:", error);
    }
  }
  
  registerAllUsersFromKeycloak() {
    console.log("🔍 Registering all users from Keycloak...");

    this.UserService.createUser().subscribe(
      (response) => {
        console.log("✅ All Keycloak users successfully registered:", response);
        this.toastr.success("All Keycloak users registered successfully!", "Success");
      },
      (error) => {
        console.error("❌ Error registering users from Keycloak:", error);
        this.toastr.error("Failed to register users from Keycloak", "Error");
      }
    );
  }

  updateUser(user: User) {
    this.router.navigate(['/update', user.email]);
  }

  deleteUser(user: User) {
    console.log("🗑 Deleting user with login:", user.login);

    if (!user.login) {
      this.toastr.error("User login is missing", 'Error');
      return;
    }

    this.UserService.deleteUser(user.login).subscribe(
      response => {
        if (response.success) {
          console.log("✅ User deleted:", response.message);
          this.toastr.success(response.message, 'Success');
          this.UserService.getUsers().subscribe(users => {
            this.userList = users;
          });
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error => {
        console.error("❌ HTTP Error:", error);
        this.toastr.error("Error occurred while deleting user", 'Error');
      }
    );
  }
}
