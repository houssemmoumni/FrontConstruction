import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Newsletter1Component } from '../../elements/forms/newsletter1/newsletter1.component';
import { SearchForm2Component } from '../../elements/forms/search-form2/search-form2.component';
import { CategoryList1Component } from '../../elements/widgets/category-list1/category-list1.component';
import { OurGallery1Component } from '../../elements/widgets/our-gallery1/our-gallery1.component';
import { RecentPosts1Component } from '../../elements/widgets/recent-posts1/recent-posts1.component';
import { TagList1Component } from '../../elements/widgets/tag-list1/tag-list1.component';
import { BlogService } from '../../../services/blog.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BlogComment } from '../../../models/blog.model';
import { FormsModule } from '@angular/forms'; // Importez FormsModule pour utiliser ngModel

@Component({
  selector: 'app-single-sidebar',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    DatePipe,
    NgClass,
    HeaderLight3Component,
    Banner1Component,
    Footer13Component,
    SearchForm2Component,
    RecentPosts1Component,
    Newsletter1Component,
    OurGallery1Component,
    CategoryList1Component,
    TagList1Component,
    FormsModule, // Ajoutez FormsModule ici
  ],
  templateUrl: './single-sidebar.component.html',
  styleUrl: './single-sidebar.component.css',
})
export class SingleSidebarComponent implements OnInit {
  banner: any = {
    pagetitle: 'Blog single with sidebar',
    bg_image: 'assets/images/banner/bnr1.jpg',
    title: 'Blog single with sidebar',
  };

  layout = {
    sidebar: true,
    sidebarPosition: 'right',
    container_class: '',
  };

  blog: any = {}; // Stocke les données du blog
  blogId!: number; // L'ID sera récupéré dynamiquement
  public isLoading: boolean = false;
  public comments: BlogComment[] = []; // Initialisation avec un tableau vide
  newCommentContent: string = ''; // Pour stocker le contenu du nouveau commentaire
  replyContent: string = '';

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.blogId = +id;
        this.loadBlog(this.blogId);
        this.loadComments(this.blogId);
      }
    });
  }

  loadBlog(id: number) {
    this.blogService.getBlogById(id).subscribe({
      next: (data) => (this.blog = data),
      error: (err) => console.error('Erreur lors du chargement du blog :', err),
    });
  }

  loadComments(id: number) {
    console.log('Chargement des commentaires pour l\'ID:', id); // 🔍 Vérification
    this.isLoading = true;

    this.blogService.getComments(id).subscribe({
      next: (data) => {
        console.log('Commentaires reçus :', data); // 🔍 Vérification
        this.comments = data || []; // Assure que `comments` est toujours un tableau
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commentaires :', err);
        this.comments = []; // En cas d'erreur, initialise `comments` à un tableau vide
        this.isLoading = false;
      },
    });
  }

  // Méthode pour ajouter un commentaire
  addComment() {
    if (!this.newCommentContent) {
      return; // Ne rien faire si le contenu est vide
    }

    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
    this.blogService.addComment(this.blogId, userId, this.newCommentContent).subscribe({
      next: (newComment) => {
        console.log('Commentaire ajouté avec succès :', newComment);
        this.comments.push(newComment); // Ajoute le nouveau commentaire à la liste
        this.newCommentContent = ''; // Réinitialise le champ de texte
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du commentaire :', err);
      },
    });
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }




// Méthode pour liker un commentaire
likeComment(comment: BlogComment) {
    comment.likes = (comment.likes || 0) + 1;
  }

  // Méthode pour disliker un commentaire
  dislikeComment(comment: BlogComment) {
    comment.dislikes = (comment.dislikes || 0) + 1;
  }

  // Méthode pour activer/désactiver le formulaire de réponse
  toggleReplyForm(comment: BlogComment) {
    comment.isReplying = !comment.isReplying;
  }

  // Méthode pour ajouter une réponse à un commentaire
  addReply(comment: BlogComment) {
    if (!this.replyContent) return; // Ne rien faire si le contenu est vide

    const newReply: BlogComment = {
      id: this.comments.length + 1, // Générer un ID unique (à adapter)
      author: 'Ahmed', // Remplacez par l'utilisateur connecté
      content: this.replyContent,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    if (!comment.replies) {
      comment.replies = []; // Initialiser le tableau de réponses si nécessaire
    }
    comment.replies.push(newReply); // Ajouter la réponse
    comment.isReplying = false; // Masquer le formulaire de réponse
    this.replyContent = ''; // Réinitialiser le champ de réponse
  }



}
