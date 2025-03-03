import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLight19Component } from './header-light19.component';

describe('HeaderLight19Component', () => {
  let component: HeaderLight19Component;
  let fixture: ComponentFixture<HeaderLight19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLight19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLight19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
