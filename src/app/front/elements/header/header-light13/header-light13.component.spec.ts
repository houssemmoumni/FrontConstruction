import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight13Component } from './header-light13.component';

describe('HeaderLight13Component', () => {
  let component: HeaderLight13Component;
  let fixture: ComponentFixture<HeaderLight13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
