import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppParameter } from '@models/app-parameter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppParameterService {

  private baseUrl : string = `${environment.baseUrl}api/AppParameter`;

  constructor(private http: HttpClient) { }

  public getOne(id: number) : Observable<AppParameter>{
    return this.http.get<AppParameter>(`${this.baseUrl}/${id}`);
  }

  public updateAppParameter(appParameter: AppParameter) : Observable<AppParameter>{
    return this.http.put<AppParameter>(`${this.baseUrl}`,appParameter);
  }
}
