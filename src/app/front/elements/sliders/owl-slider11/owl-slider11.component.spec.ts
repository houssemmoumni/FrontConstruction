import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider11Component } from './owl-slider11.component';

describe('OwlSlider11Component', () => {
  let component: OwlSlider11Component;
  let fixture: ComponentFixture<OwlSlider11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
