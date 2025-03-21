import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentService {
  private baseUrl = 'http://localhost:8020';

  constructor(private http: HttpClient) {}

  getActiveAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointment/doctor/${doctorId}/active`);
  }

  getCompletedAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointment/doctor/${doctorId}/completed`);
  }

  completeAppointment(appointmentId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/appointment/${appointmentId}/complete`, {});
  }
}
