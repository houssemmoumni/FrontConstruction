import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial10Component } from './testimonial10.component';

describe('Testimonial10Component', () => {
  let component: Testimonial10Component;
  let fixture: ComponentFixture<Testimonial10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
