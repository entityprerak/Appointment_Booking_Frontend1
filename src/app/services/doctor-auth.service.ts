import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService {
  private apiUrl = 'http://localhost:8020/logindoctor';

  constructor(private http: HttpClient) {}

  loginDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, doctor);
  }
}
