import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { BlogComment } from '../../../../models/blog.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments1',
  imports: [CommonModule],
  templateUrl: './comments1.component.html',
  styleUrls: ['./comments1.component.css']
})
export class Comments1Component implements OnInit {
    @Input() blogId!: number; // Récupère l'ID du blog
    comments: BlogComment[] = []; // Assure-toi que comments est un tableau vide par défaut
    isLoading = true; // Indicateur de chargement

    constructor(private blogService: BlogService) {}

    ngOnInit(): void {
      this.loadComments();
    }

    loadComments(): void {
      if (!this.blogId) {
        console.error("Erreur : blogId n'est pas défini.");
        this.isLoading = false;
        return;
      }

      this.isLoading = true; // Active le chargement

      this.blogService.getComments(this.blogId)
        .pipe(
          catchError(error => {
            console.error('Erreur lors du chargement des commentaires', error);
            return of([]); // Retourne un tableau vide en cas d'erreur
          })
        )
        .subscribe((data: BlogComment[]) => { // On spécifie ici que "data" doit être un tableau de BlogComment
          this.comments = data; // Assigner directement les données à "comments"
          this.isLoading = false; // Désactive le chargement
        });
    }
  }
