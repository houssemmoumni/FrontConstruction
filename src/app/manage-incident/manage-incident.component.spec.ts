import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIncidentComponent } from './manage-incident.component';

describe('ManageIncidentComponent', () => {
  let component: ManageIncidentComponent;
  let fixture: ComponentFixture<ManageIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
