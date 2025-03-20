import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageDoctorService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8020';

  getDoctorsBySpecialization(specialty: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/doctors?speciality=${specialty}`);
  }

  getPendingDoctors(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/admin/pendingDoctors`));
  }

  getApprovedDoctors(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/admin/approvedDoctors`));
  }

  approveDoctor(doctorId: number): Promise<string> {
    return firstValueFrom(this.http.put<string>(`${this.apiUrl}/admin/approveDoctor/${doctorId}`, {}));
  }

  rejectDoctor(doctorId: number): Promise<string> {
    return firstValueFrom(this.http.delete<string>(`${this.apiUrl}/admin/rejectDoctor/${doctorId}`));
  }
}
