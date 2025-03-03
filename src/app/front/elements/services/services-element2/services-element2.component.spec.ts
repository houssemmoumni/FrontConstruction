import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement2Component } from './services-element2.component';

describe('ServicesElement2Component', () => {
  let component: ServicesElement2Component;
  let fixture: ComponentFixture<ServicesElement2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
