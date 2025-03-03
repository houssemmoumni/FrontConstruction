import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement5Component } from './services-element5.component';

describe('ServicesElement5Component', () => {
  let component: ServicesElement5Component;
  let fixture: ComponentFixture<ServicesElement5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
