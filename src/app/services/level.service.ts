import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '@models/level';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private baseUrl : string = `${environment.baseUrl}api/Level`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Level[]>{
    return this.http.get<Level[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Level>{
    return this.http.get<Level>(`${this.baseUrl}/${id}`);
  }

  public addLevel(level: Level) : Observable<Level>{
    return this.http.post<Level>(`${this.baseUrl}`,level);
  }

  public updateLevel(level: Level) : Observable<Level>{
    return this.http.put<Level>(`${this.baseUrl}`,level);
  }
  public deleteLevel(id: number) : Observable<Level>{
    return this.http.delete<Level>(`${this.baseUrl}/${id}`);
  }
}
