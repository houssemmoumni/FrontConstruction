import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider3Component } from './owl-slider3.component';

describe('OwlSlider3Component', () => {
  let component: OwlSlider3Component;
  let fixture: ComponentFixture<OwlSlider3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
