import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer15Component } from './footer15.component';

describe('Footer15Component', () => {
  let component: Footer15Component;
  let fixture: ComponentFixture<Footer15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
