import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial7Component } from './testimonial7.component';

describe('Testimonial7Component', () => {
  let component: Testimonial7Component;
  let fixture: ComponentFixture<Testimonial7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
