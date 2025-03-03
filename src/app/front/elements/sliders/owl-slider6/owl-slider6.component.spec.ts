import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider6Component } from './owl-slider6.component';

describe('OwlSlider6Component', () => {
  let component: OwlSlider6Component;
  let fixture: ComponentFixture<OwlSlider6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
