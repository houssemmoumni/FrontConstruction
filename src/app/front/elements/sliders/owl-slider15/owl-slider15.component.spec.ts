import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider15Component } from './owl-slider15.component';

describe('OwlSlider15Component', () => {
  let component: OwlSlider15Component;
  let fixture: ComponentFixture<OwlSlider15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
