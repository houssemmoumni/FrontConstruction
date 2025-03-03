import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer18Component } from './footer18.component';

describe('Footer18Component', () => {
  let component: Footer18Component;
  let fixture: ComponentFixture<Footer18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
