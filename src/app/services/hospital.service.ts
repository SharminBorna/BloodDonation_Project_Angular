import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    constructor(private http: HttpClient) { }
    getHospitals(): Observable<Hospital[]> {
      return this.http.get<Hospital[]>(`http://localhost:63594/api/Hospitals`);
    }
    insertHospital(data: Hospital): Observable<Hospital> {
      return this.http.post<Hospital>(`http://localhost:63594/api/Hospitals`, data);
    }
    getHospitalById(id: number): Observable<Hospital> {
      return this.http.get<Hospital>(`http://localhost:63594/api/Hospitals/${id}`);
    }
    updateHospital(data: Hospital): Observable<any> {
      return this.http.put(`http://localhost:63594/api/Hospitals/${data.hospitalID}`, data);
    }
    deleteHospital(id: number): Observable<Hospital> {
      return this.http.delete(`http://localhost:63594/api/Hospitals/${id}`);
    }
}
