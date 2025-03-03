import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial6Component } from './testimonial6.component';

describe('Testimonial6Component', () => {
  let component: Testimonial6Component;
  let fixture: ComponentFixture<Testimonial6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Testimonial6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
