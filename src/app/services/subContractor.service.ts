import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubContractor } from '@models/subContractor';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubContractorService {

  private baseUrl : string = `${environment.baseUrl}api/SubContractor`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<SubContractor[]>{
    return this.http.get<SubContractor[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<SubContractor>{
    return this.http.get<SubContractor>(`${this.baseUrl}/${id}`);
  }

  public addSubContractor(subContractor: SubContractor) : Observable<SubContractor>{
    return this.http.post<SubContractor>(`${this.baseUrl}`,subContractor);
  }

  public updateSubContractor(subContractor: SubContractor) : Observable<SubContractor>{
    return this.http.put<SubContractor>(`${this.baseUrl}`,subContractor);
  }
  public deleteSubContractor(id: number) : Observable<SubContractor>{
    return this.http.delete<SubContractor>(`${this.baseUrl}/${id}`);
  }
}
