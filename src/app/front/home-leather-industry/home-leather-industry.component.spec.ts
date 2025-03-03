import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeatherIndustryComponent } from './home-leather-industry.component';

describe('HomeLeatherIndustryComponent', () => {
  let component: HomeLeatherIndustryComponent;
  let fixture: ComponentFixture<HomeLeatherIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLeatherIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLeatherIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
