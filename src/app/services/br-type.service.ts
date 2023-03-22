import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrType } from '@models/br-type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrTypeService {

  private baseUrl : string = `${environment.baseUrl}api/BrType`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<BrType[]>{
    return this.http.get<BrType[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<BrType>{
    return this.http.get<BrType>(`${this.baseUrl}/${id}`);
  }

  public addBrType(brType: BrType) : Observable<BrType>{
    return this.http.post<BrType>(`${this.baseUrl}`,brType);
  }

  public updateBrType(brType: BrType) : Observable<BrType>{
    return this.http.put<BrType>(`${this.baseUrl}`,brType);
  }
  public deleteBrType(id: number) : Observable<BrType>{
    return this.http.delete<BrType>(`${this.baseUrl}/${id}`);
  }
}
