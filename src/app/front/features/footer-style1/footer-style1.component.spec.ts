import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStyle1Component } from './footer-style1.component';

describe('FooterStyle1Component', () => {
  let component: FooterStyle1Component;
  let fixture: ComponentFixture<FooterStyle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStyle1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
