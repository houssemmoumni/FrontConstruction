import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer14Component } from './footer14.component';

describe('Footer14Component', () => {
  let component: Footer14Component;
  let fixture: ComponentFixture<Footer14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
