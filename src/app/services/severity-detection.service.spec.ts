import { TestBed } from '@angular/core/testing';

import { SeverityDetectionService } from './severity-detection.service';

describe('SeverityDetectionService', () => {
  let service: SeverityDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeverityDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
