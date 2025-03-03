import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction3Component } from './call-to-action3.component';

describe('CallToAction3Component', () => {
  let component: CallToAction3Component;
  let fixture: ComponentFixture<CallToAction3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
