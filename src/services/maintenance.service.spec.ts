import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaintenanceService } from './maintenance.service';
import { maintenance } from '../models/maintenance';

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaintenanceService]
    });
    service = TestBed.inject(MaintenanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all maintenances', () => {
    const dummyMaintenances: maintenance[] = [
      { id: 1, title: 'Maintenance 1', description: 'Description 1', image: 'image1.jpg', email: 'email1@example.com', contrat: {
          id: 1,
          contratcondition: '',
          date_signature: '',
          date_expiration: '',
          assurance: undefined,
          projet: undefined
      }, status: 'EN_ATTENTE' },
      { id: 2, title: 'Maintenance 2', description: 'Description 2', image: 'image2.jpg', email: 'email2@example.com', contrat: {
          id: 2,
          contratcondition: '',
          date_signature: '',
          date_expiration: '',
          assurance: undefined,
          projet: undefined
      }, status: 'EN_ATTENTE' }
    ];

    service.getAllMaintenances().subscribe(maintenances => {
      expect(maintenances.length).toBe(2);
      expect(maintenances).toEqual(dummyMaintenances);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMaintenances);
  });

  it('should retrieve a maintenance by ID', () => {
    const dummyMaintenance: maintenance = { id: 1, title: 'Maintenance 1', description: 'Description 1', image: 'image1.jpg', email: 'email1@example.com', contrat: {
        id: 1,
        contratcondition: '',
        date_signature: '',
        date_expiration: '',
        assurance: undefined,
        projet: undefined
    }, status: 'EN_ATTENTE' };

    service.getMaintenanceById(1).subscribe(maintenance => {
      expect(maintenance).toEqual(dummyMaintenance);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMaintenance);
  });

  it('should create a new maintenance', () => {
    const newMaintenance: maintenance = { title: 'Maintenance 1', description: 'Description 1', image: 'image1.jpg', email: 'email1@example.com', contrat: {
        id: 1,
        contratcondition: '',
        date_signature: '',
        date_expiration: '',
        assurance: undefined,
        projet: undefined
    }, status: 'EN_ATTENTE' };

    service.createMaintenance(newMaintenance).subscribe(maintenance => {
      expect(maintenance).toEqual({ ...newMaintenance, id: 1 });
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newMaintenance, id: 1 });
  });

  it('should update an existing maintenance', () => {
    const updatedMaintenance: maintenance = { id: 1, title: 'Updated Maintenance', description: 'Updated Description', image: 'updated_image.jpg', email: 'updated_email@example.com', contrat: {
        id: 1,
        contratcondition: '',
        date_signature: '',
        date_expiration: '',
        assurance: undefined,
        projet: undefined
    }, status: 'EN_ATTENTE' };

    service.updateMaintenance(1, updatedMaintenance).subscribe(maintenance => {
      expect(maintenance).toEqual(updatedMaintenance);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMaintenance);
  });

  it('should delete a maintenance', () => {
    service.deleteMaintenance(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});