import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content8Component } from './content8.component';

describe('Content8Component', () => {
  let component: Content8Component;
  let fixture: ComponentFixture<Content8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
