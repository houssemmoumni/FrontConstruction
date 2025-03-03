import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter3Component } from './counter3.component';

describe('Counter3Component', () => {
  let component: Counter3Component;
  let fixture: ComponentFixture<Counter3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Counter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
