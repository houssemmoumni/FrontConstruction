import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter4Component } from './counter4.component';

describe('Counter4Component', () => {
  let component: Counter4Component;
  let fixture: ComponentFixture<Counter4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Counter4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
