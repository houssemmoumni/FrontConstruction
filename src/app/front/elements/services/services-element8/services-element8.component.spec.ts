import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement8Component } from './services-element8.component';

describe('ServicesElement8Component', () => {
  let component: ServicesElement8Component;
  let fixture: ComponentFixture<ServicesElement8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
