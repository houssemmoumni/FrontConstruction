import { Component } from '@angular/core';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component';
import { CustomizerSettingsService } from './customizer-settings/customizer-settings.service';
import { ToggleService } from './common/sidebar/toggle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CustomizerSettingsComponent,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Daxa - Angular 19 Material Design Admin Dashboard Template';

  isSidebarToggled = false;
  isFrontPage: boolean = false;

  constructor(
    public router: Router,
    private toggleService: ToggleService,
    private viewportScroller: ViewportScroller,
    public themeService: CustomizerSettingsService
  ) {
    // Listen to navigation events ONCE
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isFrontPage = event.urlAfterRedirects.startsWith('/front') || event.urlAfterRedirects.startsWith('/user');
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    // Sidebar toggle state
    this.toggleService.isSidebarToggled$.subscribe((toggled) => {
      this.isSidebarToggled = toggled;
    });
  }
}
