import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer17Component } from './footer17.component';

describe('Footer17Component', () => {
  let component: Footer17Component;
  let fixture: ComponentFixture<Footer17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
