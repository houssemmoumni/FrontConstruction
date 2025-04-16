import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const mockUsers: User[] = [
    { id: 1, telephone: 21652072915, image: 'user1.jpg' },
    { id: 2, telephone: 21652072916, image: 'user2.jpg' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all users from API', () => {
    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockUsers);
  });

  it('should fetch single user by ID', () => {
    const userId = 1;
    service.getUserById(userId).subscribe(user => {
      expect(user.id).toBe(userId);
    });

    const req = httpMock.expectOne(`http://localhost:8222/api/pointage/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers[0]);
  });
});