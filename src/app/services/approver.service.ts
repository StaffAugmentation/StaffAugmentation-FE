import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Approver } from '@models/approver';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproverService {

  private baseUrl : string = `${environment.baseUrl}api/Approver`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Approver[]>{
    return this.http.get<Approver[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Approver>{
    return this.http.get<Approver>(`${this.baseUrl}/${id}`);
  }

  public addApprover(approver: Approver) : Observable<Approver>{
    return this.http.post<Approver>(`${this.baseUrl}`,approver);
  }

  public updateApprover(approver: Approver) : Observable<Approver>{
    return this.http.put<Approver>(`${this.baseUrl}`,approver);
  }
  public deleteApprover(id: number) : Observable<Approver>{
    return this.http.delete<Approver>(`${this.baseUrl}/${id}`);
  }
}
