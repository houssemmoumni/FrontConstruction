import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider8Component } from './slider8.component';

describe('Slider8Component', () => {
  let component: Slider8Component;
  let fixture: ComponentFixture<Slider8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
