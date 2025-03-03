import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGrid4Component } from './portfolio-grid4.component';

describe('PortfolioGrid4Component', () => {
  let component: PortfolioGrid4Component;
  let fixture: ComponentFixture<PortfolioGrid4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioGrid4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioGrid4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
