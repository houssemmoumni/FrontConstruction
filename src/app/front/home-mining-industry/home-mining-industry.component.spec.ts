import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiningIndustryComponent } from './home-mining-industry.component';

describe('HomeMiningIndustryComponent', () => {
  let component: HomeMiningIndustryComponent;
  let fixture: ComponentFixture<HomeMiningIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMiningIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMiningIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
