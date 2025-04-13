import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinancialReportService } from './financial-report.service';

describe('FinancialReportService', () => {
  let service: FinancialReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialReportService]
    });
    service = TestBed.inject(FinancialReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
