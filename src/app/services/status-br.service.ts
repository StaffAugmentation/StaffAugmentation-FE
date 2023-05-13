import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusBR } from '@models/status-br';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusBRService {

  private baseUrl : string = `${environment.baseUrl}api/StatusBR`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<StatusBR[]>{
    return this.http.get<StatusBR[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<StatusBR>{
    return this.http.get<StatusBR>(`${this.baseUrl}/${id}`);
  }

  public addStatusBR(StatusBR: StatusBR) : Observable<StatusBR>{
    return this.http.post<StatusBR>(`${this.baseUrl}`,StatusBR);
  }

  public updateStatusBR(StatusBR: StatusBR) : Observable<StatusBR>{
    return this.http.put<StatusBR>(`${this.baseUrl}`,StatusBR);
  }
  public deleteStatusBR(id: number) : Observable<StatusBR>{
    return this.http.delete<StatusBR>(`${this.baseUrl}/${id}`);
  }
}
