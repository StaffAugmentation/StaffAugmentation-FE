import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HighestDegree } from '@models/highest-degree';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HighestDegreeService {

  private baseUrl : string = `${environment.baseUrl}api/HighestDegree`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<HighestDegree[]>{
    return this.http.get<HighestDegree[]>(this.baseUrl);
  }

  public getOne(Id: number) : Observable<HighestDegree>{
    return this.http.get<HighestDegree>(`${this.baseUrl}/${Id}`);
  }

  public addHighestDegree(HighestDegree: HighestDegree) : Observable<HighestDegree>{
    return this.http.post<HighestDegree>(`${this.baseUrl}`,HighestDegree);
  }

  public updateHighestDegree(HighestDegree: HighestDegree) : Observable<HighestDegree>{
    return this.http.put<HighestDegree>(`${this.baseUrl}`,HighestDegree);
  }
  public deleteHighestDegree(Id: number) : Observable<HighestDegree>{
    return this.http.delete<HighestDegree>(`${this.baseUrl}/${Id}`);
  }
}
