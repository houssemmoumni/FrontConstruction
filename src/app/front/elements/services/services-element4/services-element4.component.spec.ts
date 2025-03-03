import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement4Component } from './services-element4.component';

describe('ServicesElement4Component', () => {
  let component: ServicesElement4Component;
  let fixture: ComponentFixture<ServicesElement4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
