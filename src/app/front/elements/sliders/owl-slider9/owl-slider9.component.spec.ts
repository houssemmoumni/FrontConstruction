import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider9Component } from './owl-slider9.component';

describe('OwlSlider9Component', () => {
  let component: OwlSlider9Component;
  let fixture: ComponentFixture<OwlSlider9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
