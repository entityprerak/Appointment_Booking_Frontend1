import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientProfileService {
  private apiUrl = 'http://localhost:8020/user';

  constructor(private http: HttpClient) {}

  // Fetch user profile by userId
  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  // Update user profile
  updateUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateuser`, user);
  }
}