import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodStock } from '../models/blood-stock';

@Injectable({
  providedIn: 'root'
})
export class BloodStockService {

  constructor(private http: HttpClient) { }
  getStock(): Observable<BloodStock[]> {
    return this.http.get<BloodStock[]>(`http://localhost:63594/api/BloodStocks`);
  }
  insertStock(data: BloodStock): Observable<BloodStock> {
    return this.http.post<BloodStock>(`http://localhost:63594/api/BloodStocks`, data);
  }
  getStockById(id: number): Observable<BloodStock> {
    return this.http.get<BloodStock>(`http://localhost:63594/api/BloodStocks/${id}`);
  }
  updateStock(data: BloodStock): Observable<any> {
    return this.http.put(`http://localhost:63594/api/BloodStocks/${data.bloodStockID}`, data);
  }
  deleteStock(id: number): Observable<BloodStock> {
    return this.http.delete(`http://localhost:63594/api/BloodStocks/${id}`);
  }
}
