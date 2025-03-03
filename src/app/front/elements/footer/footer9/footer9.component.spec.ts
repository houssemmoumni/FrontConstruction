import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer9Component } from './footer9.component';

describe('Footer9Component', () => {
  let component: Footer9Component;
  let fixture: ComponentFixture<Footer9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
