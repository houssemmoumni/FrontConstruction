import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlSlider12Component } from './owl-slider12.component';

describe('OwlSlider12Component', () => {
  let component: OwlSlider12Component;
  let fixture: ComponentFixture<OwlSlider12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlSlider12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlSlider12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
