import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }
    getLocations(): Observable<Location[]> {
      return this.http.get<Location[]>(`http://localhost:63594/api/Locations`);
    }
    insertLocation(data: Location): Observable<Location> {
      return this.http.post<Location>(`http://localhost:63594/api/Locations`, data);
    }
    getLocationById(id: number): Observable<Location> {
      return this.http.get<Location>(`http://localhost:63594/api/Locations/${id}`);
    }
    updateLocation(data: Location): Observable<any> {
      return this.http.put(`http://localhost:63594/api/Locations/${data.locationID}`, data);
    }
    deleteLocation(id: number): Observable<Location> {
      return this.http.delete(`http://localhost:63594/api/Locations/${id}`);
    }
}
