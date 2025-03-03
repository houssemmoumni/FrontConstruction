import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider9Component } from './slider9.component';

describe('Slider9Component', () => {
  let component: Slider9Component;
  let fixture: ComponentFixture<Slider9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
