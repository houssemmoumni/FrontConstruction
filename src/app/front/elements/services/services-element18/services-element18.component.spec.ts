import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement18Component } from './services-element18.component';

describe('ServicesElement18Component', () => {
  let component: ServicesElement18Component;
  let fixture: ComponentFixture<ServicesElement18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
