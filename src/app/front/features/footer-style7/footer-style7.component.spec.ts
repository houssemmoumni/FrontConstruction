import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStyle7Component } from './footer-style7.component';

describe('FooterStyle7Component', () => {
  let component: FooterStyle7Component;
  let fixture: ComponentFixture<FooterStyle7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStyle7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterStyle7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
