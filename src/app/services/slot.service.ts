import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private apiUrl = 'http://localhost:8020/slots'; // Adjust URL if needed

  constructor(private http: HttpClient) {}

  getSlotById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
