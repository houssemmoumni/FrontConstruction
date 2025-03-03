import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial11Component } from './testimonial11.component';

describe('Testimonial11Component', () => {
  let component: Testimonial11Component;
  let fixture: ComponentFixture<Testimonial11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
