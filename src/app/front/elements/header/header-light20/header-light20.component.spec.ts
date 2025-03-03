import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight20Component } from './header-light20.component';

describe('HeaderLight20Component', () => {
  let component: HeaderLight20Component;
  let fixture: ComponentFixture<HeaderLight20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight20Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
