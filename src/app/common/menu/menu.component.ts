import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CustomizerSettingsComponent } from '../../customizer-settings/customizer-settings.component';
import { ToggleService } from '../sidebar/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet,
          CommonModule,
          SidebarComponent,
          HeaderComponent,
          FooterComponent,
          CustomizerSettingsComponent,
          NgClass,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  title = 'Daxa - Angular 19 Material Design Admin Dashboard Template';

    // isSidebarToggled
    isSidebarToggled = false;
    isFrontPage: boolean = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        private viewportScroller: ViewportScroller,
        public themeService: CustomizerSettingsService
    ) {
        this.router.events.subscribe((event: Event) => {
            this.router.events.subscribe(() => {
                this.isFrontPage = this.router.url.startsWith('/front');
            });
            if (event instanceof NavigationEnd) {
                // Scroll to the top after each navigation end
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
      }

}
