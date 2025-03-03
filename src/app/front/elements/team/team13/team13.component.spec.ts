import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team13Component } from './team13.component';

describe('Team13Component', () => {
  let component: Team13Component;
  let fixture: ComponentFixture<Team13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
