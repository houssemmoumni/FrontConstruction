import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStyle11Component } from './footer-style11.component';

describe('FooterStyle11Component', () => {
  let component: FooterStyle11Component;
  let fixture: ComponentFixture<FooterStyle11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStyle11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterStyle11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
