import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from '../models/job-offer.model';
import { JobOfferService } from '../services/job-offer.service';

@Component({
    selector: 'app-add-job',
    standalone: true,
    templateUrl: './addjob.component.html',
    styleUrls: ['./addjob.component.css'],
    imports: [NgClass, NgFor, NgIf, FormsModule],
})
export class AddJobComponent implements OnInit {
    jobOffer: JobOffer = {
        title: '',
        description: '',
        status: 'OPEN', // ✅ Correction ici
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
            this.jobOfferService.getJobOfferById(+id).subscribe((data) => {
                this.jobOffer = data;
            });
        }
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }

        if (!this.jobOffer.postedDate) {
            this.jobOffer.postedDate = new Date().toISOString().split('T')[0];
        }

        if (this.jobOffer.id) {
            this.jobOfferService.updateJobOffer(this.jobOffer.id, this.jobOffer).subscribe(() => {
                this.router.navigate(['/joboffre']);
            });
        } else {
            this.jobOfferService.addJobOffer(this.jobOffer).subscribe(() => {
                this.router.navigate(['/joboffre']);
            });
        }
    }
}
