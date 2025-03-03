import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSolarPlantComponent } from './home-solar-plant.component';

describe('HomeSolarPlantComponent', () => {
  let component: HomeSolarPlantComponent;
  let fixture: ComponentFixture<HomeSolarPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSolarPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSolarPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
