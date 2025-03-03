import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider6Component } from './slider6.component';

describe('Slider6Component', () => {
  let component: Slider6Component;
  let fixture: ComponentFixture<Slider6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
