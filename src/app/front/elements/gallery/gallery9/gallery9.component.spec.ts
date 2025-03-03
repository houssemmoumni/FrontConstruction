import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery9Component } from './gallery9.component';

describe('Gallery9Component', () => {
  let component: Gallery9Component;
  let fixture: ComponentFixture<Gallery9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Gallery9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
