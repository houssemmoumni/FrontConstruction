import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveIncidentComponent } from './resolve-incident.component';

describe('ResolveIncidentComponent', () => {
  let component: ResolveIncidentComponent;
  let fixture: ComponentFixture<ResolveIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolveIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
