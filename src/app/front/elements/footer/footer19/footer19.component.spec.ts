import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer19Component } from './footer19.component';

describe('Footer19Component', () => {
  let component: Footer19Component;
  let fixture: ComponentFixture<Footer19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Footer19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
