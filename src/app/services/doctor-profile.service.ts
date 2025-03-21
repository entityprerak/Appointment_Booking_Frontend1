import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorProfileService {
  private baseUrl = 'http://localhost:8020/doctors'; // Adjust based on actual backend URL

  constructor(private http: HttpClient) {}

  getDoctorById(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${doctorId}`);
  }
}
