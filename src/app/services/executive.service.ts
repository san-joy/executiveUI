import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { executiveData } from '../models/executive-data.model';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
  private apiUrl = environment.apiUrl + '/executives';

  constructor(private http: HttpClient) {}

  getExecutives(): Observable<executiveData[]> {
    return this.http.get<executiveData[]>(this.apiUrl).pipe(
      map((data: any) => {
        return data.value;
      })
    );
  }

  createExecutive(executive: executiveData): Observable<executiveData> {
    return this.http.post<executiveData>(this.apiUrl, executive);
  }

  updateExecutive(id: number, executive: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, executive);
  }
}
