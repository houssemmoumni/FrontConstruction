import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer21Component } from './footer21.component';

describe('Footer21Component', () => {
  let component: Footer21Component;
  let fixture: ComponentFixture<Footer21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
