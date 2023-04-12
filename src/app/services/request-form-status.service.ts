import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFormStatus } from '@models/request-form-status';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestFormStatusService {

  private baseUrl : string = `${environment.baseUrl}api/RequestFormStatus`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<RequestFormStatus[]>{
    return this.http.get<RequestFormStatus[]>(this.baseUrl);
  }

  public getOne(Id: number) : Observable<RequestFormStatus>{
    return this.http.get<RequestFormStatus>(`${this.baseUrl}/${Id}`);
  }

  public addRequestFormStatus(RequestFormStatus: RequestFormStatus) : Observable<RequestFormStatus>{
    return this.http.post<RequestFormStatus>(`${this.baseUrl}`,RequestFormStatus);
  }

  public updateRequestFormStatus(RequestFormStatus: RequestFormStatus) : Observable<RequestFormStatus>{
    return this.http.put<RequestFormStatus>(`${this.baseUrl}`,RequestFormStatus);
  }
  public deleteRequestFormStatus(Id: number) : Observable<RequestFormStatus>{
    return this.http.delete<RequestFormStatus>(`${this.baseUrl}/${Id}`);
  }
}
