import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement10Component } from './services-element10.component';

describe('ServicesElement10Component', () => {
  let component: ServicesElement10Component;
  let fixture: ComponentFixture<ServicesElement10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
