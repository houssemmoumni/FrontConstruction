import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider'; // Import MatDividerModule
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar'; // Import NgScrollbarModule
import { CustomizerSettingsService } from './customizer-settings.service';

@Component({
  selector: 'app-customizer-settings',
  standalone: true, // Mark the component as standalone
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDividerModule, // Add MatDividerModule to imports
    FormsModule,
    NgScrollbarModule // Add NgScrollbarModule to imports
  ], // Add necessary modules to imports
  templateUrl: './customizer-settings.component.html',
  styleUrls: ['./customizer-settings.component.scss']
})
export class CustomizerSettingsComponent {

    // isToggled
    isToggled = false;
    
    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // Card Border Radius
    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    // Settings Button Toggle
    toggle() {
        this.themeService.toggle();
    }

}