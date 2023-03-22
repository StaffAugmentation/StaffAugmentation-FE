import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcontractor } from '@models/subcontractor';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcontractorService {

  private baseUrl : string = `${environment.baseUrl}api/Subcontractor`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Subcontractor[]>{
    return this.http.get<Subcontractor[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Subcontractor>{
    return this.http.get<Subcontractor>(`${this.baseUrl}/${id}`);
  }

  public addSubcontractor(subcontractor: Subcontractor) : Observable<Subcontractor>{
    return this.http.post<Subcontractor>(`${this.baseUrl}`,subcontractor);
  }

  public updateSubcontractor(subcontractor: Subcontractor) : Observable<Subcontractor>{
    return this.http.put<Subcontractor>(`${this.baseUrl}`,subcontractor);
  }
  public deleteSubcontractor(id: number) : Observable<Subcontractor>{
    return this.http.delete<Subcontractor>(`${this.baseUrl}/${id}`);
  }
}
