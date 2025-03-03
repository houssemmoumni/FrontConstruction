import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery6Component } from './gallery6.component';

describe('Gallery6Component', () => {
  let component: Gallery6Component;
  let fixture: ComponentFixture<Gallery6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Gallery6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
