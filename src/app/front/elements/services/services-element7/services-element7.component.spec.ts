import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesElement7Component } from './services-element7.component';

describe('ServicesElement7Component', () => {
  let component: ServicesElement7Component;
  let fixture: ComponentFixture<ServicesElement7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesElement7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesElement7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
