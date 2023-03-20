import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '@models/type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TypeService {

  private baseUrl : string = `${environment.baseUrl}api/Type`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Type[]>{
    return this.http.get<Type[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Type>{
    return this.http.get<Type>(`${this.baseUrl}/${id}`);
  }

  public addType(Type: Type) : Observable<Type>{
    return this.http.post<Type>(`${this.baseUrl}`,Type);
  }

  public updateType(Type: Type) : Observable<Type>{
    return this.http.put<Type>(`${this.baseUrl}`,Type);
  }

  public deleteType(id: number) : Observable<Type>{
    return this.http.delete<Type>(`${this.baseUrl}/${id}`);
  }
}
