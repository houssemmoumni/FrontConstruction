import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-blog',
  imports: [MatCardModule, MatMenuModule, MatPaginator,MatButtonModule, RouterLink, NgFor, CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
    blogs: Blog[] = []; // Liste des blogs
    dataSource = new MatTableDataSource<Blog>(this.blogs); // Source de données pour la pagination
    displayedColumns: string[] = ['title', 'content', 'date', 'actions']; // Colonnes à afficher
    searchForm: FormGroup | undefined; // Formulaire de recherche

    @ViewChild(MatPaginator) paginator!: MatPaginator; // Référence au paginator

    constructor(
      private blogService: BlogService,
      private dialog: MatDialog,
      private fb: FormBuilder
    ) {
      // Initialiser le formulaire de recherche
      this.searchForm = this.fb.group({
        searchQuery: [''], // Champ de recherche
      });
    }

    ngOnInit(): void {
      this.loadBlogs(); // Charger les blogs au démarrage

      // Écouter les changements dans le champ de recherche
      this.searchForm!
        .get('searchQuery')!
        ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((query) => {
          this.applyFilter(query); // Appliquer le filtre de recherche
        });
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator; // Lier le paginator à la source de données
    }

    // Charger les blogs depuis le service
    loadBlogs(): void {
      this.blogService.getBlogs().subscribe({
        next: (data) => {
          console.log('Blogs reçus:', data); // Afficher les blogs dans la console
          this.blogs = data; // Mettre à jour la liste des blogs
          this.dataSource.data = this.blogs; // Mettre à jour la source de données
        },
        error: (err) => {
          console.error('Erreur lors du chargement des blogs:', err); // Gérer les erreurs
        },
      });
    }

    // Appliquer le filtre de recherche
    applyFilter(query: string): void {
      this.dataSource.filter = query.trim().toLowerCase(); // Filtrer les blogs
    }

    // Supprimer un blog
    deleteBlog(id: number): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Êtes-vous sûr de vouloir supprimer ce blog ?',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Si l'utilisateur confirme la suppression
          this.blogService.deleteBlog(id).subscribe({
            next: () => {
              this.blogs = this.blogs.filter((blog) => blog.id !== id); // Filtrer les blogs pour supprimer celui-ci
              this.dataSource.data = this.blogs; // Mettre à jour la source de données
              console.log('Blog supprimé avec succès'); // Afficher un message de succès
            },
            error: (err) => {
              console.error('Erreur lors de la suppression du blog:', err); // Gérer les erreurs
            },
          });
        }
      });
    }
  }
