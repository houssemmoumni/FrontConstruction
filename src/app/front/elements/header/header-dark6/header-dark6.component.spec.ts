import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDark6Component } from './header-dark6.component';

describe('HeaderDark6Component', () => {
  let component: HeaderDark6Component;
  let fixture: ComponentFixture<HeaderDark6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDark6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDark6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
