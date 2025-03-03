import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFoodIndustryComponent } from './home-food-industry.component';

describe('HomeFoodIndustryComponent', () => {
  let component: HomeFoodIndustryComponent;
  let fixture: ComponentFixture<HomeFoodIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFoodIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFoodIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
