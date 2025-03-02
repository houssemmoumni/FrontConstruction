import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationDTO } from '../models/application.dto';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'http://localhost:8060/api/applications';

  constructor(private http: HttpClient) {}

  // Submit an application
  submitApplication(
    candidateId: number,
    jobOfferId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    resumeFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('candidateId', candidateId.toString());
    formData.append('jobOfferId', jobOfferId.toString());
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('resumeFile', resumeFile);

    return this.http.post(this.apiUrl, formData);
  }

  // Fetch all applications
  getAllApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl);
  }

  // Update the status of an application
  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }
}
