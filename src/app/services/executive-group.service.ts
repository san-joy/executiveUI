import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { executiveGroupData } from '../models/executive-group-data.model';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveGroupService {
    private apiUrl = environment.apiUrl + '/executiveGroups';

  constructor(private http: HttpClient) {}

  getExecutiveGroups(): Observable<any[]> {
    return this.http.get<executiveGroupData[]>(this.apiUrl).pipe(map((data: any) => {
        return data.value;
      })
    );
  }
}
