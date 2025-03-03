import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider13Component } from './slider13.component';

describe('Slider13Component', () => {
  let component: Slider13Component;
  let fixture: ComponentFixture<Slider13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
