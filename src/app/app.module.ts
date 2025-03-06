import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './common/sidebar/sidebar.component'; // Import SidebarComponent as a standalone component
import { HeaderComponent } from './common/header/header.component'; // Import HeaderComponent as a standalone component
import { FooterComponent } from './common/footer/footer.component'; // Import FooterComponent as a standalone component
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component'; // Import CustomizerSettingsComponent as a standalone component
import { NegociationAllListComponent } from './apps/Negociation/Negociation-AllList/Negociation-AllList.component'; // Import NegociationAllListComponent as a standalone component
import { NegociationAddComponent } from './apps/Negociation/Negociation-ADD/Negociation-ADD.component'; // Import NegociationAddComponent as a standalone component
import { NegociationComponent } from './front/pages/Negociation/Negociation.component'; // Import NegociationComponent as a standalone component

@NgModule({
  declarations: [
    // Remove NegociationComponent from declarations
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    NgScrollbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    SidebarComponent, // Import SidebarComponent as a standalone component
    HeaderComponent, // Import HeaderComponent as a standalone component
    FooterComponent, // Import FooterComponent as a standalone component
    CustomizerSettingsComponent, // Import CustomizerSettingsComponent as a standalone component
    NegociationAllListComponent, // Import NegociationAllListComponent as a standalone component
    NegociationAddComponent, // Import NegociationAddComponent as a standalone component
    NegociationComponent // Import NegociationComponent as a standalone component
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA to schemas
})
export class AppModule {}