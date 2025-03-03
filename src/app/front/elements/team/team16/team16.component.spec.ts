import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team16Component } from './team16.component';

describe('Team16Component', () => {
  let component: Team16Component;
  let fixture: ComponentFixture<Team16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Team16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
