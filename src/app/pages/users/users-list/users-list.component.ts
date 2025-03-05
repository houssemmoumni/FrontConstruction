import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Récupérer tous les utilisateurs
  fetchUsers() {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
     
  }

  // Supprimer un utilisateur
  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.adminService.deleteUser(id).subscribe(
        () => {
          alert('Utilisateur supprimé avec succès');
          this.fetchUsers(); // Rafraîchir la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
}
