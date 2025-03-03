import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight4Component } from './header-light4.component';

describe('HeaderLight4Component', () => {
  let component: HeaderLight4Component;
  let fixture: ComponentFixture<HeaderLight4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
