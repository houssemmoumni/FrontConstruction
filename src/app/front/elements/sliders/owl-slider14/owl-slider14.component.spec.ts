import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider14Component } from './owl-slider14.component';

describe('OwlSlider14Component', () => {
  let component: OwlSlider14Component;
  let fixture: ComponentFixture<OwlSlider14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
