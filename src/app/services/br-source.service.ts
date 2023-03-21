import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrSource } from '@models/br-source';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrSourceService {

  private baseUrl : string = `${environment.baseUrl}api/BrSource`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<BrSource[]>{
    return this.http.get<BrSource[]>(this.baseUrl);
  }

  public getOne(idSource: number) : Observable<BrSource>{
    return this.http.get<BrSource>(`${this.baseUrl}/${idSource}`);
  }

  public addBrSource(brSource: BrSource) : Observable<BrSource>{
    return this.http.post<BrSource>(`${this.baseUrl}`,brSource);
  }

  public updateBrSource(brSource: BrSource) : Observable<BrSource>{
    return this.http.put<BrSource>(`${this.baseUrl}`,brSource);
  }
  public deleteBrSource(idSource: number) : Observable<BrSource>{
    return this.http.delete<BrSource>(`${this.baseUrl}/${idSource}`);
  }
}
