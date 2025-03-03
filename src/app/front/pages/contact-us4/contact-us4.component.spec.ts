import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUs4Component } from './contact-us4.component';

describe('ContactUs4Component', () => {
  let component: ContactUs4Component;
  let fixture: ComponentFixture<ContactUs4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUs4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactUs4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
