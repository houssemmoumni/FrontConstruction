import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction8Component } from './call-to-action8.component';

describe('CallToAction8Component', () => {
  let component: CallToAction8Component;
  let fixture: ComponentFixture<CallToAction8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
