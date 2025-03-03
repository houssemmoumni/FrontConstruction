import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider13Component } from './owl-slider13.component';

describe('OwlSlider13Component', () => {
  let component: OwlSlider13Component;
  let fixture: ComponentFixture<OwlSlider13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
