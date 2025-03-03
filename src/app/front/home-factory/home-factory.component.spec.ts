import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFactoryComponent } from './home-factory.component';

describe('HomeFactoryComponent', () => {
  let component: HomeFactoryComponent;
  let fixture: ComponentFixture<HomeFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
