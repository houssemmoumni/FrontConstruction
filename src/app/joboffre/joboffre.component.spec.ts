import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoboffreComponent } from './joboffre.component';

describe('JoboffreComponent', () => {
  let component: JoboffreComponent;
  let fixture: ComponentFixture<JoboffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoboffreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoboffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
