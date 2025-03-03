import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team12Component } from './team12.component';

describe('Team12Component', () => {
  let component: Team12Component;
  let fixture: ComponentFixture<Team12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
