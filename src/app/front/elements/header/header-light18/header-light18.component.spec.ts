import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight18Component } from './header-light18.component';

describe('HeaderLight18Component', () => {
  let component: HeaderLight18Component;
  let fixture: ComponentFixture<HeaderLight18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
