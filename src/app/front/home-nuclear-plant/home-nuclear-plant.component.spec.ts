import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNuclearPlantComponent } from './home-nuclear-plant.component';

describe('HomeNuclearPlantComponent', () => {
  let component: HomeNuclearPlantComponent;
  let fixture: ComponentFixture<HomeNuclearPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNuclearPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNuclearPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
