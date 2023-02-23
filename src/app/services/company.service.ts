import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '@models/company';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl : string = `${environment.baseUrl}api/Company`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Company[]>{
    return this.http.get<Company[]>(this.baseUrl);
  }

  public getOne(companyId: number) : Observable<Company>{
    return this.http.get<Company>(`${this.baseUrl}/${companyId}`);
  }
  
}
