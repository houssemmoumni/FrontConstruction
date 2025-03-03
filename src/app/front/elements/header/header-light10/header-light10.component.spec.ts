import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight10Component } from './header-light10.component';

describe('HeaderLight10Component', () => {
  let component: HeaderLight10Component;
  let fixture: ComponentFixture<HeaderLight10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
