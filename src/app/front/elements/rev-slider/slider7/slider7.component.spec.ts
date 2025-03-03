import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider7Component } from './slider7.component';

describe('Slider7Component', () => {
  let component: Slider7Component;
  let fixture: ComponentFixture<Slider7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
