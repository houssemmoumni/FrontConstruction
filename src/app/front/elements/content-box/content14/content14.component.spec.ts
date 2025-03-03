import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content14Component } from './content14.component';

describe('Content14Component', () => {
  let component: Content14Component;
  let fixture: ComponentFixture<Content14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
