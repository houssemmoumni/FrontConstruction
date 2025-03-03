import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement14Component } from './services-element14.component';

describe('ServicesElement14Component', () => {
  let component: ServicesElement14Component;
  let fixture: ComponentFixture<ServicesElement14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
