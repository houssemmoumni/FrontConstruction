import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CourseSalesService } from '../../../../services/course-sales.service';
import { PercentPipe } from '@angular/common'
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js'; // Importer Chart.js

@Component({
    selector: 'app-course-sales',
    imports: [MatCardModule, MatMenuModule, MatButtonModule,PercentPipe,CommonModule],
    templateUrl: './course-sales.component.html',
    styleUrl: './course-sales.component.scss'
})
// src/app/components/course-sales/course-sales.component.ts
export class CourseSalesComponent implements OnInit {
    publishedStats: { published: number; unpublished: number } = { published: 0, unpublished: 0 };
    chart: any; // Variable pour stocker l'instance du graphique

    constructor(private courseSalesService: CourseSalesService) {
      Chart.register(...registerables); // Enregistrer les composants de Chart.js
    }

    ngOnInit(): void {
      this.loadPublishedStats();
    }

    // Charger les statistiques de cours publiés vs non publiés
    loadPublishedStats(): void {
      this.courseSalesService.getPublishedVsUnpublishedStats().subscribe({
        next: (data) => {
          this.publishedStats = data;
          this.loadChart(); // Charger le graphique après avoir reçu les données
        },
        error: (err) => {
          console.error('Failed to load published stats:', err);
        },
      });
    }

    // Charger le graphique
    loadChart(): void {
      const ctx = document.getElementById('lms_courses_sales_chart') as HTMLCanvasElement;

      // Détruire le graphique existant s'il y en a un
      if (this.chart) {
        this.chart.destroy();
      }

      // Créer un nouveau graphique
      this.chart = new Chart(ctx, {
        type: 'bar', // Type de graphique (bar, line, pie, etc.)
        data: {
          labels: ['Published', 'Unpublished'], // Étiquettes des axes
          datasets: [
            {
              label: 'Number of Courses',
              data: [this.publishedStats.published, this.publishedStats.unpublished], // Données
              backgroundColor: ['#36A2EB', '#FF6384'], // Couleurs des barres
              borderColor: ['#36A2EB', '#FF6384'], // Couleurs des bordures
              borderWidth: 1,
            },
          ],
        },
        options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Course Statistics', // Titre du graphique
                font: {
                  size: 18, // Taille de la police du titre
                },
              },
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
      });
    }
  }
