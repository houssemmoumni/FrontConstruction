import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement6Component } from './services-element6.component';

describe('ServicesElement6Component', () => {
  let component: ServicesElement6Component;
  let fixture: ComponentFixture<ServicesElement6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
