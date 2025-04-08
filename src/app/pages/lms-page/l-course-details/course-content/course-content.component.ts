import { Component, Input, OnInit } from '@angular/core';
import { ModuleService } from '../../../../services/module.service';
import { Module } from '../../../../models/module.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [MatCardModule,MatIconModule, MatButtonModule, MatExpansionModule, CommonModule,RouterModule],
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  // Propriété d'entrée pour recevoir l'ID du cours
  @Input() courseId!: number;

  // Expansion Panel
  panelOpenState = false;

  // Liste des modules
  modules: Module[] = [];

  constructor(
    public themeService: CustomizerSettingsService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.loadModules(this.courseId); // Charger les modules du cours spécifié
    }
  }

  // Charger les modules d'un cours
  loadModules(courseId: number): void {
    this.moduleService.getModulesByCourseId(courseId).subscribe({
      next: (modules) => {
        this.modules = modules;
      },
      error: (err) => {
        console.error('Failed to load modules:', err);
      },
    });
  }

  // Convertir la durée en minutes en format "HH:MM"
  formatDuration(duration: number | undefined): string {
    if (!duration) return '00:00';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
