import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial13Component } from './testimonial13.component';

describe('Testimonial13Component', () => {
  let component: Testimonial13Component;
  let fixture: ComponentFixture<Testimonial13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
