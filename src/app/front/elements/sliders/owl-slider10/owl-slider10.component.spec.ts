import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider10Component } from './owl-slider10.component';

describe('OwlSlider10Component', () => {
  let component: OwlSlider10Component;
  let fixture: ComponentFixture<OwlSlider10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
