import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement9Component } from './services-element9.component';

describe('ServicesElement9Component', () => {
  let component: ServicesElement9Component;
  let fixture: ComponentFixture<ServicesElement9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
