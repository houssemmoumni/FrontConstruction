import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects1Component } from './projects1.component';

describe('Projects1Component', () => {
  let component: Projects1Component;
  let fixture: ComponentFixture<Projects1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Projects1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
