import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
                         // Use 0 or undefined for new offers
        title: '',
        description: '',
        Status: '',
        postedDate: '',
        publish: false           // Add this to match the model
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

    onSubmit() {

        // console.log(this.jobOffer);
        if (!this.jobOffer.postedDate) {
            console.log('Formulaire valide', this.jobOffer);
            this.jobOffer.postedDate = new Date().toISOString().split('T')[0];  // Set today's date
        }

        if (this.jobOffer.id) {
            this.jobOfferService.updateJobOffer(this.jobOffer.id, this.jobOffer).subscribe(() => {
                this.router.navigate(['/joboffre']);
            });



        } else {
            this.jobOfferService.addJobOffer(this.jobOffer).subscribe(() => {
                console.log(this.jobOffer)
                this.router.navigate(['/joboffre']);
            });
        }
    }
}



