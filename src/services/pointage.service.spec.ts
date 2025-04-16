import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PointageService } from './pointage.service';
import { HistoriquePointage, CreatePointageDto } from '../models/pointage.model';
import { User } from '../models/user.model';

describe('PointageService', () => {
  let service: PointageService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    telephone: 1234567890,
    image: 'user1.jpg'
  };

  const mockPointage: HistoriquePointage = {
    id: 1,
    jour_pointage: '2023-05-15',
    temps_entree: '08:01',
    temps_sortie: '17:00',
    localisation: 'Site ACAP',
    user: mockUser,  // Changed from id_user to user object
    score: 95,
    temps_commencement: '08:00',
    temps_finition: '17:01'
  };

  const mockCreateDto: CreatePointageDto = {
    jour_pointage: '2023-05-15',
    temps_entree: '08:01',
    temps_sortie: '17:00',
    localisation: 'Site ACAP',
    user: { id: 1 },  // Changed from id_user to user object with id
    temps_commencement: '08:00',
    temps_finition: '17:01'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PointageService]
    });
    service = TestBed.inject(PointageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pointages with credentials', () => {
    service.getAllPointages().subscribe(pointages => {
      expect(pointages).toEqual([mockPointage]);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush([mockPointage]);
  });

  it('should create pointage with correct transformed payload', () => {
    service.createPointage(mockCreateDto).subscribe(pointage => {
      expect(pointage).toEqual(mockPointage);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages');
    expect(req.request.method).toBe('POST');
    
    // Verify the transformed payload
    expect(req.request.body).toEqual({
      ...mockCreateDto,
      user: {
        id: 1,
        telephone: 0,      // Default value added by service
        image: ''          // Default value added by service
      }
    });
    
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockPointage);
  });

  it('should update pointage with correct payload structure', () => {
    service.updatePointage(1, mockPointage).subscribe(pointage => {
      expect(pointage).toEqual(mockPointage);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockPointage);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockPointage);
  });

  it('should handle 404 error specifically', () => {
    service.getPointageById(999).subscribe({
      error: (err) => {
        expect(err.message).toContain('Resource not found');
      }
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages/999');
    req.flush('Not found', { status: 404, statusText: 'Not found' });
  });

  it('should download PDF as blob', () => {
    const mockBlob = new Blob(['test content'], { type: 'application/pdf' });

    service.downloadPointagePdf(1).subscribe(response => {
      expect(response instanceof Blob).toBeTrue();
      expect(response.type).toBe('application/pdf');
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages/1/download');
    expect(req.request.responseType).toBe('blob');
    req.flush(mockBlob);
  });

  it('should handle network errors', () => {
    service.getAllPointages().subscribe({
      error: (err) => {
        expect(err.message).toContain('An unknown error occurred');
      }
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages');
    req.error(new ProgressEvent('Network error'));
  });

  it('should delete pointage with credentials', () => {
    service.deletePointage(1).subscribe(response => {
      expect(response).toBeNull(); // Typically delete returns void or null
    });

    const req = httpMock.expectOne('http://localhost:8222/api/pointage/historique-pointages/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(null);
  });
});