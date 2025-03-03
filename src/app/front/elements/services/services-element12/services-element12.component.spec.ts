import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement12Component } from './services-element12.component';

describe('ServicesElement12Component', () => {
  let component: ServicesElement12Component;
  let fixture: ComponentFixture<ServicesElement12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
