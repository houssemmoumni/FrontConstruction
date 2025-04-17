import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignIncidentComponent } from './assign-incident.component';

describe('AssignIncidentComponent', () => {
  let component: AssignIncidentComponent;
  let fixture: ComponentFixture<AssignIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
