import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement13Component } from './services-element13.component';

describe('ServicesElement13Component', () => {
  let component: ServicesElement13Component;
  let fixture: ComponentFixture<ServicesElement13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
