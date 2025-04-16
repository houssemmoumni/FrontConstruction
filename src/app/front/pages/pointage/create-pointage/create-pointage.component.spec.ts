import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../services/user.service';
import { CreatePointageComponent } from './create-pointage.component';

describe('CreatePointageComponent', () => {
  let component: CreatePointageComponent;
  let fixture: ComponentFixture<CreatePointageComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getAllUsers']);
    mockUserService.getAllUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule, RouterTestingModule],
      declarations: [CreatePointageComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.pointageForm).toBeDefined();
    expect(component.pointageForm.controls['jour_pointage'].value).toBeDefined();
  });

  it('should load users on init', () => {
    const mockUsers: User[] = [{ id: 1, telephone: 1234567890, image: '' }];
    mockUserService.getAllUsers.and.returnValue(of(mockUsers));
    component.ngOnInit();
    expect(component.users).toEqual(mockUsers);
  });
});