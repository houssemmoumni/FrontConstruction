import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsCourseComponent } from './user-details-course.component';

describe('UserDetailsCourseComponent', () => {
  let component: UserDetailsCourseComponent;
  let fixture: ComponentFixture<UserDetailsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
