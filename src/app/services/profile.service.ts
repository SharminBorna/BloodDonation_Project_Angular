import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { ImagePathResponse } from '../models/image-path-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`http://localhost:63594/api/Profiles`);
  }
  insertProfile(data: Profile): Observable<Profile> {
    return this.http.post<Profile>(`http://localhost:63594/api/Profiles`, data);
  }
  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`http://localhost:63594/api/Profiles/${id}`);
  }
  updateProfile(data: Profile): Observable<any> {
    return this.http.put(`http://localhost:63594/api/Profiles/${data.profileID}`, data);
  }
  deleteProfile(id: number): Observable<Profile> {
    return this.http.delete<Profile>(`http://localhost:63594/api/Profiles/Delete/${id}`);
  }

  upload(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`http://localhost:63594/api/Profiles/Uploads/${id}`, formData);
  }
}
