import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBox3Component } from './icon-box3.component';

describe('IconBox3Component', () => {
  let component: IconBox3Component;
  let fixture: ComponentFixture<IconBox3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconBox3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconBox3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
