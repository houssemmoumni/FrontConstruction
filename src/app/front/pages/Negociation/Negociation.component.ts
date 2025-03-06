import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociationService } from '../../../apps/Negociation/negociation.service';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-negociation',
    standalone: true, // Mark the component as standalone
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
        RouterModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ], // Add necessary modules to imports
    templateUrl: './Negociation.component.html',
    styleUrls: ['./Negociation.component.scss'],
    providers: [CurrencyPipe]
})
export class NegociationComponent implements OnInit {
  nomPhase: string = '';
  statut: string = '';
  dateDebut: string = '';
  dateFin: string = '';
  negociationId: number = 0;
  banner: any = {}; // Add a banner property

  constructor(
    private route: ActivatedRoute,
    private negociationService: NegociationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getNegociationDetails(id);
    });
  }

  getNegociationDetails(id: string) {
    this.negociationService.getNegociationById(id).subscribe(
      data => {
        const negociation = data[0]; // Assuming the response is an array with one object
        this.nomPhase = negociation.nomPhase;
        this.statut = negociation.statut;
        this.dateDebut = negociation.dateDebut;
        this.dateFin = negociation.dateFin;
        this.negociationId = negociation.negociationId;
      },
      error => {
        console.error('Error fetching negociation details', error);
      }
    );
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
