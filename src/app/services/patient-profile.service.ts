import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientProfileService {
  private apiUrl = 'http://localhost:8020/user';

  constructor(private http: HttpClient) {}

  // Fetch user profile by userId
  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error fetching profile:', error);
        if (error.status === 200 && error.error instanceof ProgressEvent) {
          console.error('Likely received HTML instead of JSON (possible login page)');
        }
        return throwError(() => new Error(error.message));
      }));
  }

  // Update user profile
  updateUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateuser`, user, { withCredentials: true });
  }
}