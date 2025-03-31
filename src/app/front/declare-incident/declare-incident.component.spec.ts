import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclareIncidentComponent } from './declare-incident.component';

describe('DeclareIncidentComponent', () => {
  let component: DeclareIncidentComponent;
  let fixture: ComponentFixture<DeclareIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclareIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclareIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
