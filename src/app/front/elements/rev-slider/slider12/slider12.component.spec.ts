import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider12Component } from './slider12.component';

describe('Slider12Component', () => {
  let component: Slider12Component;
  let fixture: ComponentFixture<Slider12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slider12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
