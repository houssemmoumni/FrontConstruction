import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer20Component } from './footer20.component';

describe('Footer20Component', () => {
  let component: Footer20Component;
  let fixture: ComponentFixture<Footer20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer20Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
