import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation2Component } from './navigation2.component';

describe('Navigation2Component', () => {
  let component: Navigation2Component;
  let fixture: ComponentFixture<Navigation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Navigation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
