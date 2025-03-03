import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement15Component } from './services-element15.component';

describe('ServicesElement15Component', () => {
  let component: ServicesElement15Component;
  let fixture: ComponentFixture<ServicesElement15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
