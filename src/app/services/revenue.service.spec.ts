import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RevenueService } from './revenue.service';

describe('RevenueService', () => {
  let service: RevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RevenueService]
    });
    service = TestBed.inject(RevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
