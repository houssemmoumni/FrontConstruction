import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation1Component } from './navigation1.component';

describe('Navigation1Component', () => {
  let component: Navigation1Component;
  let fixture: ComponentFixture<Navigation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Navigation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
