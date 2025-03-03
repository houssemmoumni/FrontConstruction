import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial8Component } from './testimonial8.component';

describe('Testimonial8Component', () => {
  let component: Testimonial8Component;
  let fixture: ComponentFixture<Testimonial8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
