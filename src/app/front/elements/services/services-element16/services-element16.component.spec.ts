import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement16Component } from './services-element16.component';

describe('ServicesElement16Component', () => {
  let component: ServicesElement16Component;
  let fixture: ComponentFixture<ServicesElement16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
