import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial9Component } from './testimonial9.component';

describe('Testimonial9Component', () => {
  let component: Testimonial9Component;
  let fixture: ComponentFixture<Testimonial9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
