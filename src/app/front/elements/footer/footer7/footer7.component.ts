import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import {} from '@angular/common/http';

@Component({
    selector: 'app-footer7',
    imports: [
        RouterLink,
        NgClass,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './footer7.component.html',
    styleUrl: './footer7.component.css'
})
export class Footer7Component {
  email = 'info@example.com';
  subscribeForm: FormGroup;
  message: string | undefined;
  success: boolean | undefined;

  constructor(private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      const email = this.subscribeForm.value.email;
      this.success = true;
      this.message = 'You have successfully subscribed.';
    } else {
      this.message = 'Please enter a valid email address.';
      this.success = false;
    }
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
