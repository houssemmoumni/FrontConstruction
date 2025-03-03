import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlasticIndustryComponent } from './home-plastic-industry.component';

describe('HomePlasticIndustryComponent', () => {
  let component: HomePlasticIndustryComponent;
  let fixture: ComponentFixture<HomePlasticIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlasticIndustryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePlasticIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
