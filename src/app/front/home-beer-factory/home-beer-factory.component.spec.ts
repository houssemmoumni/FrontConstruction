import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBeerFactoryComponent } from './home-beer-factory.component';

describe('HomeBeerFactoryComponent', () => {
  let component: HomeBeerFactoryComponent;
  let fixture: ComponentFixture<HomeBeerFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBeerFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeBeerFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
