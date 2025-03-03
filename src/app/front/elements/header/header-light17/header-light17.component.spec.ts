import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight17Component } from './header-light17.component';

describe('HeaderLight17Component', () => {
  let component: HeaderLight17Component;
  let fixture: ComponentFixture<HeaderLight17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
