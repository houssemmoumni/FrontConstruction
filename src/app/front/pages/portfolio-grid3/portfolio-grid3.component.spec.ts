import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGrid3Component } from './portfolio-grid3.component';

describe('PortfolioGrid3Component', () => {
  let component: PortfolioGrid3Component;
  let fixture: ComponentFixture<PortfolioGrid3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioGrid3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioGrid3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
