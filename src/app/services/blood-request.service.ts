import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodRequest } from '../models/blood-request';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {

  constructor(private http: HttpClient) { }
  getRequest(): Observable<BloodRequest[]> {
    return this.http.get<BloodRequest[]>(`http://localhost:63594/api/BloodRequests`);
  }
  insertRequest(data: BloodRequest): Observable<BloodRequest> {
    return this.http.post<BloodRequest>(`http://localhost:63594/api/BloodRequests`, data);
  }
  getRequestById(id: number): Observable<BloodRequest> {
    return this.http.get<BloodRequest>(`http://localhost:63594/api/BloodRequests/${id}`);
  }
  updateRequest(data: BloodRequest): Observable<any> {
    return this.http.put(`http://localhost:63594/api/BloodRequests/${data.bloodRequestID}`, data);
  }
  deleteRequest(id: number): Observable<BloodRequest> {
    return this.http.delete(`http://localhost:63594/api/BloodRequests/${id}`);
  }
}
