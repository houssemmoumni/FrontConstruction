import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight14Component } from './header-light14.component';

describe('HeaderLight14Component', () => {
  let component: HeaderLight14Component;
  let fixture: ComponentFixture<HeaderLight14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
