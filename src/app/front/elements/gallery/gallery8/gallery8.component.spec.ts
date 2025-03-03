import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery8Component } from './gallery8.component';

describe('Gallery8Component', () => {
  let component: Gallery8Component;
  let fixture: ComponentFixture<Gallery8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Gallery8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
