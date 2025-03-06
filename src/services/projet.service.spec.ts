import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjetService } from './projet.service';
import { projet } from '../models/projet.model';

describe('ProjetService', () => {
    let service: ProjetService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProjetService]
        });
        service = TestBed.inject(ProjetService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all projets', () => {
        const projetList: projet[] = [
            {
                id: 1, image: new Blob(),
                title: undefined
            },
            {
                id: 2, image: new Blob(),
                title: undefined
            }
        ];

        service.getAllProjets().subscribe(response => {
            expect(response.length).toBe(2);
            expect(response).toEqual(projetList);
        });

        const req = httpMock.expectOne('http://localhost:8030/api/projets');
        expect(req.request.method).toBe('GET');
        req.flush(projetList);
    });

    // Add more tests as needed
});
