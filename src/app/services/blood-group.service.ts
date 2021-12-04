import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BloodGroup } from '../models/blood-group';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {

    constructor(private http: HttpClient) { }
    getBloodGroups(): Observable<BloodGroup[]> {
      return this.http.get<BloodGroup[]>(`http://localhost:63594/api/BloodGroups`);
    }
    insertBloodGroup(data: BloodGroup): Observable<BloodGroup> {
      return this.http.post<BloodGroup>(`http://localhost:63594/api/BloodGroups`, data);
    }
    getBloodGroupById(id: number): Observable<BloodGroup> {
      return this.http.get<BloodGroup>(`http://localhost:63594/api/BloodGroups/${id}`);
    }
    updateBloodGroup(data: BloodGroup): Observable<any> {
      return this.http.put(`http://localhost:63594/api/BloodGroups/${data.bloodGroupID}`, data);
    }
    deleteBloodGroup(id: number): Observable<BloodGroup> {
      return this.http.delete(`http://localhost:63594/api/BloodGroups/${id}`);
    }
}
