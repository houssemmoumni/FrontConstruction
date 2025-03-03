import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team15Component } from './team15.component';

describe('Team15Component', () => {
  let component: Team15Component;
  let fixture: ComponentFixture<Team15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
