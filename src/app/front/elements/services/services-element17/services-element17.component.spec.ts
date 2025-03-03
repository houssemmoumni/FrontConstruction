import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement17Component } from './services-element17.component';

describe('ServicesElement17Component', () => {
  let component: ServicesElement17Component;
  let fixture: ComponentFixture<ServicesElement17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
