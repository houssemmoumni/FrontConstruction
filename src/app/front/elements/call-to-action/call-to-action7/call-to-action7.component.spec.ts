import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction7Component } from './call-to-action7.component';

describe('CallToAction7Component', () => {
  let component: CallToAction7Component;
  let fixture: ComponentFixture<CallToAction7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
