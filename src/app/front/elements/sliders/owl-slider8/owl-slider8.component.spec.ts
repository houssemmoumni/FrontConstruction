import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider8Component } from './owl-slider8.component';

describe('OwlSlider8Component', () => {
  let component: OwlSlider8Component;
  let fixture: ComponentFixture<OwlSlider8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
