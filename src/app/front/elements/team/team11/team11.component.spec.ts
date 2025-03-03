import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team11Component } from './team11.component';

describe('Team11Component', () => {
  let component: Team11Component;
  let fixture: ComponentFixture<Team11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
