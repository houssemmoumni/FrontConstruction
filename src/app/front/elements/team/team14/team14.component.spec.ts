import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team14Component } from './team14.component';

describe('Team14Component', () => {
  let component: Team14Component;
  let fixture: ComponentFixture<Team14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
