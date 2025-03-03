import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider2Component } from './owl-slider2.component';

describe('OwlSlider2Component', () => {
  let component: OwlSlider2Component;
  let fixture: ComponentFixture<OwlSlider2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
