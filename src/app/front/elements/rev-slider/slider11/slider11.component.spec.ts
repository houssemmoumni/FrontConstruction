import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider11Component } from './slider11.component';

describe('Slider11Component', () => {
  let component: Slider11Component;
  let fixture: ComponentFixture<Slider11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
