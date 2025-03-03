import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider4Component } from './owl-slider4.component';

describe('OwlSlider4Component', () => {
  let component: OwlSlider4Component;
  let fixture: ComponentFixture<OwlSlider4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
