import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement3Component } from './services-element3.component';

describe('ServicesElement3Component', () => {
  let component: ServicesElement3Component;
  let fixture: ComponentFixture<ServicesElement3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
