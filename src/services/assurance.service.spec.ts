import { TestBed } from '@angular/core/testing';

import { AssuranceService } from './assurance.service';

describe('AssuranceService', () => {
  let service: AssuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an assurance', () => {
    const assuranceData = {
      name: 'Test Assurance',
      description: 'Test Description',
      adresse: 'Test Address',
      email: 'test@example.com',
      telephone: '123456789',
      fax: '987654321',
      logo: 'test-logo.png',
      siteWeb: 'http://test.com'
    };

    service.createAssurance(assuranceData).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.name).toBe('Test Assurance');
    });
  });
});
