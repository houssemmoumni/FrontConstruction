import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConstructComponent } from './home-construct.component';

describe('HomeConstructComponent', () => {
  let component: HomeConstructComponent;
  let fixture: ComponentFixture<HomeConstructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeConstructComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
