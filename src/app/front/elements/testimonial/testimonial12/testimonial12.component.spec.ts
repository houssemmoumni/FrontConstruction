import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial12Component } from './testimonial12.component';

describe('Testimonial12Component', () => {
  let component: Testimonial12Component;
  let fixture: ComponentFixture<Testimonial12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
