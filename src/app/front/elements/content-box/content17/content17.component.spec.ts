import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content17Component } from './content17.component';

describe('Content17Component', () => {
  let component: Content17Component;
  let fixture: ComponentFixture<Content17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Content17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
