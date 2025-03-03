import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight7Component } from './header-light7.component';

describe('HeaderLight7Component', () => {
  let component: HeaderLight7Component;
  let fixture: ComponentFixture<HeaderLight7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
