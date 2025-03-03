import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight16Component } from './header-light16.component';

describe('HeaderLight16Component', () => {
  let component: HeaderLight16Component;
  let fixture: ComponentFixture<HeaderLight16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
