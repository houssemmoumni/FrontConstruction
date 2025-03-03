import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgricultureComponent } from './home-agriculture.component';

describe('HomeAgricultureComponent', () => {
  let component: HomeAgricultureComponent;
  let fixture: ComponentFixture<HomeAgricultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAgricultureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
