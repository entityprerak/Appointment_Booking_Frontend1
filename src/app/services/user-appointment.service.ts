import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAppointmentService {
  private baseUrl = 'http://localhost:8020/appointment';

  constructor(private http: HttpClient) {}

  // Get appointments using the userId from sessionStorage
  getUserAppointments(): Observable<any> {
    const userId = sessionStorage.getItem('userId');
    const headers = new HttpHeaders({ 'userId': userId || '' });
    return this.http.get<any>(`${this.baseUrl}/user`, { headers });
  }

  // Cancel an appointment
  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${appointmentId}`);
  }
}
