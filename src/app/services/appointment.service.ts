import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:8020';

  constructor(private http: HttpClient) {}

  // Fetch approved doctors by specialization
  getDoctorsBySpecialization(specialty: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctors?speciality=${specialty}`);
  }

  // Fetch available slots for a doctor and date
  getAvailableSlots(doctorId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slots/available/${doctorId}/${date}`);
  }

  // Book an appointment
  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/appointment/new`, appointmentData);
  }
}