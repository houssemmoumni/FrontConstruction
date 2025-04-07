import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../services/incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resolve-incident',
  templateUrl: './resolve-incident.component.html',
  styleUrls: ['./resolve-incident.component.scss']
})
export class ResolveIncidentComponent implements OnInit {
  incidentId!: number; // Definite assignment assertion
  technicianId: number = 1; // Get from auth service in real app

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.incidentId = +idParam;
    } else {
      this.snackBar.open('Invalid incident ID', 'Close', { duration: 3000 });
      this.router.navigate(['/incidents']);
    }
  }

  resolve(resolved: boolean): void {
    if (!this.incidentId) {
      this.snackBar.open('No incident selected', 'Close', { duration: 3000 });
      return;
    }

    this.incidentService.resolveIncident(this.incidentId, resolved, this.technicianId).subscribe({
      next: () => {
        this.snackBar.open(`Incident marked as ${resolved ? 'resolved' : 'unresolved'}`, 'Close', { duration: 3000 });
        this.router.navigate(['/incidents']);
      },
      error: () => {
        this.snackBar.open('Failed to update incident status', 'Close', { duration: 3000 });
      }
    });
  }
}
