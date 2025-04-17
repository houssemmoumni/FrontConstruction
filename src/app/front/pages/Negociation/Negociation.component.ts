// Negociation.component.ts
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
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-negociation',
    standalone: true,
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
    ],
    templateUrl: './Negociation.component.html',
    styleUrls: ['./Negociation.component.scss'],
    providers: [CurrencyPipe]
})
export class NegociationComponent implements OnInit {
    negociationForm: FormGroup;
    negociationId: number = 0;
    banner: any = {};
    private apiUrl = 'http://localhost:8890/gestionnegociation/api/phase1/negociations'; // Adjust the base URL if needed

    constructor(
        private route: ActivatedRoute,
        private negociationService: NegociationService,
        private http: HttpClient,
        private fb: FormBuilder
    ) {
        this.negociationForm = this.fb.group({
              budgetEstime: ['', [Validators.required, Validators.min(0)]],
            exigences: ['', Validators.required],
            demande: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.negociationId = +id;
                // Si vous avez besoin de charger des données existantes, vous pouvez le faire ici
                // this.getNegociationDetails(id);
            }
        });
    }

    onSubmit() {
        if (this.negociationForm.valid) {
            const payload = {
                id: this.negociationId, // Include the ID directly in the payload
                budgetEstime: this.negociationForm.value.budgetEstime,
                exigences: this.negociationForm.value.exigences,
                demande: this.negociationForm.value.demande
            };

            this.http.post(`${this.apiUrl}/ADD${this.negociationId}`, payload).subscribe(
                (response) => {
                    alert('Négociation envoyée avec succès !');
                    this.negociationForm.reset();// Optionally reset the form after submission
                },
                (error) => {
                  
                    alert('Négociation envoyée avec succès !');
                    this.negociationForm.reset();
                }
            );
        } else {
            alert('Veuillez remplir tous les champs obligatoires correctement.');
        }
    }

    scroll_top() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    goNegociation() {
        const url = window.location.href;
        const id = url.split('/').pop();
        // Navigate to the specified path with the extracted id
        window.location.href = `/front/negociationList/${id}`;
    }
}