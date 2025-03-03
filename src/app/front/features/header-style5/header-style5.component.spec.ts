import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStyle5Component } from './header-style5.component';

describe('HeaderStyle5Component', () => {
  let component: HeaderStyle5Component;
  let fixture: ComponentFixture<HeaderStyle5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStyle5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderStyle5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
