import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDark5Component } from './header-dark5.component';

describe('HeaderDark5Component', () => {
  let component: HeaderDark5Component;
  let fixture: ComponentFixture<HeaderDark5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDark5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDark5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
