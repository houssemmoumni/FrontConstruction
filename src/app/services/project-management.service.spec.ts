import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectManagementService } from '../services/project-management.service';  // Fix the import path

describe('ProjectManagementService', () => {
  let service: ProjectManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectManagementService]
    });
    service = TestBed.inject(ProjectManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
