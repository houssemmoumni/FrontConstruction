import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial5Component } from './testimonial5.component';

describe('Testimonial5Component', () => {
  let component: Testimonial5Component;
  let fixture: ComponentFixture<Testimonial5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
