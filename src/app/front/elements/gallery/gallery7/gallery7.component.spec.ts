import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery7Component } from './gallery7.component';

describe('Gallery7Component', () => {
  let component: Gallery7Component;
  let fixture: ComponentFixture<Gallery7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Gallery7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
