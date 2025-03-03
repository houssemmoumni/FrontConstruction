import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction4Component } from './call-to-action4.component';

describe('CallToAction4Component', () => {
  let component: CallToAction4Component;
  let fixture: ComponentFixture<CallToAction4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
