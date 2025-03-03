import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOilPlantComponent } from './home-oil-plant.component';

describe('HomeOilPlantComponent', () => {
  let component: HomeOilPlantComponent;
  let fixture: ComponentFixture<HomeOilPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOilPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOilPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
