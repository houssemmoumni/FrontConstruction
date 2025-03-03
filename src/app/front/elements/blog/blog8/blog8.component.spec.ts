import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog8Component } from './blog8.component';

describe('Blog8Component', () => {
  let component: Blog8Component;
  let fixture: ComponentFixture<Blog8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Blog8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
