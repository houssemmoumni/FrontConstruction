import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight15Component } from './header-light15.component';

describe('HeaderLight15Component', () => {
  let component: HeaderLight15Component;
  let fixture: ComponentFixture<HeaderLight15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
