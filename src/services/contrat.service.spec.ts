import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContratService } from './contrat.service';
import { contrat } from '../models/contrat.model';

describe('ContratService', () => {
    let service: ContratService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContratService]
        });
        service = TestBed.inject(ContratService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create a contrat', () => {
        const contratData: contrat = {
            contratcondition: 'Test Condition',
            date_signature: '2023-10-01',
            date_expiration: '2024-10-01',
            assurance: { id: 1, name: 'Test Assurance', description: 'Test Description', adresse: 'Test Address', email: 'test@example.com', telephone: '123456789', fax: '987654321', logo: 'test-logo.png', siteWeb: 'http://test.com' },
            projet: { id: 1, image: new Blob() }
        };

        service.createContrat(contratData).subscribe(response => {
            expect(response).toBeTruthy();
            expect(response.contratcondition).toBe('Test Condition');
        });

        const req = httpMock.expectOne('http://localhost:8030/api/contrats');
        expect(req.request.method).toBe('POST');
        req.flush(contratData);
    });

    it('should get all contrats', () => {
        const contratList: contrat[] = [
            { contratcondition: 'Condition 1', date_signature: '2023-10-01', date_expiration: '2024-10-01', assurance: { id: 1, name: 'Assurance 1', description: 'Description 1', adresse: 'Address 1', email: 'email1@example.com', telephone: '123456789', fax: '987654321', logo: 'logo1.png', siteWeb: 'http://site1.com' }, projet: { id: 1,image: new Blob() } },
            { contratcondition: 'Condition 2', date_signature: '2023-11-01', date_expiration: '2024-11-01', assurance: { id: 2, name: 'Assurance 2', description: 'Description 2', adresse: 'Address 2', email: 'email2@example.com', telephone: '123456789', fax: '987654321', logo: 'logo2.png', siteWeb: 'http://site2.com' }, projet: { id: 2,image: new Blob() } }
        ];

        service.getAllContrats().subscribe(response => {
            expect(response.length).toBe(2);
            expect(response).toEqual(contratList);
        });

        const req = httpMock.expectOne('http://localhost:8030/api/contrats');
        expect(req.request.method).toBe('GET');
        req.flush(contratList);
    });

    it('should get a contrat by id', () => {
        const contratData: contrat = { contratcondition: 'Condition 1', date_signature: '2023-10-01', date_expiration: '2024-10-01', assurance: { id: 1, name: 'Assurance 1', description: 'Description 1', adresse: 'Address 1', email: 'email1@example.com', telephone: '123456789', fax: '987654321', logo: 'logo1.png', siteWeb: 'http://site1.com' }, projet: { id: 1,image: new Blob() } };

        service.getContratById(1).subscribe(response => {
            expect(response).toEqual(contratData);
        });

        const req = httpMock.expectOne('http://localhost:8030/api/contrats/1');
        expect(req.request.method).toBe('GET');
        req.flush(contratData);
    });

    it('should update a contrat', () => {
        const contratData: contrat = { contratcondition: 'Updated Condition', date_signature: '2023-10-01', date_expiration: '2024-10-01', assurance: { id: 1, name: 'Updated Assurance', description: 'Updated Description', adresse: 'Updated Address', email: 'updated@example.com', telephone: '123456789', fax: '987654321', logo: 'updated-logo.png', siteWeb: 'http://updated.com' }, projet: { id: 1,image: new Blob() } };

        service.updateContrat(1, contratData).subscribe(response => {
            expect(response).toEqual(contratData);
        });

        const req = httpMock.expectOne('http://localhost:8030/api/contrats/1');
        expect(req.request.method).toBe('PUT');
        req.flush(contratData);
    });

    it('should delete a contrat', () => {
        service.deleteContrat(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8030/api/contrats/1');
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});
