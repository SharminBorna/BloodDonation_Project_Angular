import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonateBlood } from '../models/donate-blood';

@Injectable({
  providedIn: 'root'
})
export class DonateBloodService {

  constructor(private http: HttpClient) { }

  getDonateBlood(): Observable<DonateBlood[]> {
    return this.http.get<DonateBlood[]>(`http://localhost:63594/api/DonateBloods`);
  }
  insertDonateBlood(data: DonateBlood): Observable<DonateBlood> {
    return this.http.post<DonateBlood>(`http://localhost:63594/api/DonateBloods`, data);
  }
  getDonateBloodById(id: number): Observable<DonateBlood> {
    return this.http.get<DonateBlood>(`http://localhost:63594/api/DonateBloods/${id}`);
  }
  updateDonateBlood(data: DonateBlood): Observable<any> {
    return this.http.put(`http://localhost:63594/api/DonateBloods/${data.donateBloodID}`, data);
  }
  deleteDonateBlood(id: number): Observable<DonateBlood> {
    return this.http.delete(`http://localhost:63594/api/DonateBloods/${id}`);
  }

}
