import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarIndustryComponent } from './home-car-industry.component';

describe('HomeCarIndustryComponent', () => {
  let component: HomeCarIndustryComponent;
  let fixture: ComponentFixture<HomeCarIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCarIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
