import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private baseUrl = 'http://localhost:8020/admin';

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allDoctors`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allUsers`);
  }
}
