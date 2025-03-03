import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction6Component } from './call-to-action6.component';

describe('CallToAction6Component', () => {
  let component: CallToAction6Component;
  let fixture: ComponentFixture<CallToAction6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToAction6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
