import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider10Component } from './slider10.component';

describe('Slider10Component', () => {
  let component: Slider10Component;
  let fixture: ComponentFixture<Slider10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
