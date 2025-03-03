import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight5Component } from './header-light5.component';

describe('HeaderLight5Component', () => {
  let component: HeaderLight5Component;
  let fixture: ComponentFixture<HeaderLight5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
