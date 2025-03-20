import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditProfileService {
  private apiUrl = 'http://localhost:8020/user/updateuser';

  constructor(private http: HttpClient) {}

  updateProfile(profile: any): Observable<any> {
    return this.http.put(this.apiUrl, profile);
  }
}