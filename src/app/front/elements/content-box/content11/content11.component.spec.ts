import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content11Component } from './content11.component';

describe('Content11Component', () => {
  let component: Content11Component;
  let fixture: ComponentFixture<Content11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
