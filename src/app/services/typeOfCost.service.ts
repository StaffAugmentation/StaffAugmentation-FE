import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeOfCost } from '@models/typeOfCost';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeOfCostService {

  private baseUrl : string = `${environment.baseUrl}api/TypeOfCost`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<TypeOfCost[]>{
    return this.http.get<TypeOfCost[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<TypeOfCost>{
    return this.http.get<TypeOfCost>(`${this.baseUrl}/${id}`);
  }

  public addTypeOfCost(typeOfCost: TypeOfCost) : Observable<TypeOfCost>{
    return this.http.post<TypeOfCost>(`${this.baseUrl}`,typeOfCost);
  }

  public updateTypeOfCost(typeOfCost: TypeOfCost) : Observable<TypeOfCost>{
    return this.http.put<TypeOfCost>(`${this.baseUrl}`,typeOfCost);
  }
  public deleteTypeOfCost(id: number) : Observable<TypeOfCost>{
    return this.http.delete<TypeOfCost>(`${this.baseUrl}/${id}`);
  }
}
