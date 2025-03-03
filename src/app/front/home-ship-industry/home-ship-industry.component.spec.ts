import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShipIndustryComponent } from './home-ship-industry.component';

describe('HomeShipIndustryComponent', () => {
  let component: HomeShipIndustryComponent;
  let fixture: ComponentFixture<HomeShipIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeShipIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeShipIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
