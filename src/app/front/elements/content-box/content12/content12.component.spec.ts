import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content12Component } from './content12.component';

describe('Content12Component', () => {
  let component: Content12Component;
  let fixture: ComponentFixture<Content12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
