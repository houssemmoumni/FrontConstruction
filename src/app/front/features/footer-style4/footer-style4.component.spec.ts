import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStyle4Component } from './footer-style4.component';

describe('FooterStyle4Component', () => {
  let component: FooterStyle4Component;
  let fixture: ComponentFixture<FooterStyle4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStyle4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterStyle4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
