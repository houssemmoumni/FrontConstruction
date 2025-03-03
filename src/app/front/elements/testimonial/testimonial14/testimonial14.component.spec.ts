import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial14Component } from './testimonial14.component';

describe('Testimonial14Component', () => {
  let component: Testimonial14Component;
  let fixture: ComponentFixture<Testimonial14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
