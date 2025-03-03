import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSteelPlantComponent } from './home-steel-plant.component';

describe('HomeSteelPlantComponent', () => {
  let component: HomeSteelPlantComponent;
  let fixture: ComponentFixture<HomeSteelPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSteelPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSteelPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
