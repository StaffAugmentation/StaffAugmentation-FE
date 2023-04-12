import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OERPCode } from '@models/oerp-code';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OERPCodeService {

  private baseUrl : string = `${environment.baseUrl}api/OERPCode`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<OERPCode[]>{
    return this.http.get<OERPCode[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<OERPCode>{
    return this.http.get<OERPCode>(`${this.baseUrl}/${id}`);
  }

  public addOERPCode(OERPCode: OERPCode) : Observable<OERPCode>{
    return this.http.post<OERPCode>(`${this.baseUrl}`,OERPCode);
  }

  public updateOERPCode(OERPCode: OERPCode) : Observable<OERPCode>{
    return this.http.put<OERPCode>(`${this.baseUrl}`,OERPCode);
  }
  public deleteOERPCode(id: number) : Observable<OERPCode>{
    return this.http.delete<OERPCode>(`${this.baseUrl}/${id}`);
  }
}
