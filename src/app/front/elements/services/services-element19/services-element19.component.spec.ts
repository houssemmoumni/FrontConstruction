import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement19Component } from './services-element19.component';

describe('ServicesElement19Component', () => {
  let component: ServicesElement19Component;
  let fixture: ComponentFixture<ServicesElement19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
