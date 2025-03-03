import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDark1Component } from './header-dark1.component';

describe('HeaderDark1Component', () => {
  let component: HeaderDark1Component;
  let fixture: ComponentFixture<HeaderDark1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDark1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDark1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
