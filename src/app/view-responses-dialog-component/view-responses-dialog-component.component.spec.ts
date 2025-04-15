import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResponsesDialogComponentComponent } from './view-responses-dialog-component.component';

describe('ViewResponsesDialogComponentComponent', () => {
  let component: ViewResponsesDialogComponentComponent;
  let fixture: ComponentFixture<ViewResponsesDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResponsesDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResponsesDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
