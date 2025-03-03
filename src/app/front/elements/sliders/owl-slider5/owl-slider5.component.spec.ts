import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider5Component } from './owl-slider5.component';

describe('OwlSlider5Component', () => {
  let component: OwlSlider5Component;
  let fixture: ComponentFixture<OwlSlider5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
