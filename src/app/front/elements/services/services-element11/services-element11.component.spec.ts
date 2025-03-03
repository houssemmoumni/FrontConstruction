import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement11Component } from './services-element11.component';

describe('ServicesElement11Component', () => {
  let component: ServicesElement11Component;
  let fixture: ComponentFixture<ServicesElement11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
