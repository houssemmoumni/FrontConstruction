import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResponseDialogComponent } from './edit-response-dialog.component';

describe('EditResponseDialogComponent', () => {
  let component: EditResponseDialogComponent;
  let fixture: ComponentFixture<EditResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditResponseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
