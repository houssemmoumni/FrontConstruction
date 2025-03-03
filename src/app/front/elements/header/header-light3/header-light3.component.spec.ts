import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight3Component } from './header-light3.component';

describe('HeaderLight3Component', () => {
  let component: HeaderLight3Component;
  let fixture: ComponentFixture<HeaderLight3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
