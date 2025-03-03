import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider7Component } from './owl-slider7.component';

describe('OwlSlider7Component', () => {
  let component: OwlSlider7Component;
  let fixture: ComponentFixture<OwlSlider7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
