import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGrid2Component } from './portfolio-grid2.component';

describe('PortfolioGrid2Component', () => {
  let component: PortfolioGrid2Component;
  let fixture: ComponentFixture<PortfolioGrid2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioGrid2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
