import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from '../models/job-offer.model';
import { JobOfferService } from '../services/job-offer.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-job',
  standalone: true,
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class AddJobComponent implements OnInit {
  jobOffer: JobOffer = {
    title: '',
    description: '',
    status: 'OPEN',
    postedDate: '',
    publish: false
  };

  constructor(
    public jobOfferService: JobOfferService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobOfferService.getJobOfferById(+id).subscribe({
        next: (data) => {
          this.jobOffer = data;
        },
        error: (err) => {
          console.error('Error loading job offer:', err);
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!this.jobOffer.postedDate) {
      this.jobOffer.postedDate = new Date().toISOString();
    }

    const operation = this.jobOffer.id
      ? this.jobOfferService.updateJobOffer(this.jobOffer.id, this.jobOffer)
      : this.jobOfferService.addJobOffer(this.jobOffer);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/joboffre']);
      },
      error: (err) => {
        console.error('Error saving job offer:', err);
      }
    });
  }
}
