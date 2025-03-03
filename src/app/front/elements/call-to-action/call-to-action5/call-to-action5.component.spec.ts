import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction5Component } from './call-to-action5.component';

describe('CallToAction5Component', () => {
  let component: CallToAction5Component;
  let fixture: ComponentFixture<CallToAction5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
