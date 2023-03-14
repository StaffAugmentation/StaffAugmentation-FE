import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Approvers } from '@models/approvers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproverService {

  private baseUrl : string = `${environment.baseUrl}api/Approver`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Approvers[]>{
    return this.http.get<Approvers[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Approvers>{
    return this.http.get<Approvers>(`${this.baseUrl}/${id}`);
  }

  public addApprover(approver: Approvers) : Observable<Approvers>{
    return this.http.post<Approvers>(`${this.baseUrl}`,approver);
  }

  public updateApprover(approver: Approvers) : Observable<Approvers>{
    return this.http.put<Approvers>(`${this.baseUrl}`,approver);
  }
  public deleteApprover(id: number) : Observable<Approvers>{
    return this.http.delete<Approvers>(`${this.baseUrl}/${id}`);
  }
}
