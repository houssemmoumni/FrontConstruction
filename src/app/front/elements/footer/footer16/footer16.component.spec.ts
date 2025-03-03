import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer16Component } from './footer16.component';

describe('Footer16Component', () => {
  let component: Footer16Component;
  let fixture: ComponentFixture<Footer16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
