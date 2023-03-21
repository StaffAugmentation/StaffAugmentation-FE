import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PTMOwner } from '@models/ptmOwner';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PTMOwnerService {

  private baseUrl : string = `${environment.baseUrl}api/PTMOwner`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<PTMOwner[]>{
    return this.http.get<PTMOwner[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<PTMOwner>{
    return this.http.get<PTMOwner>(`${this.baseUrl}/${id}`);
  }

  public addPTMOwner(PTMOwner: PTMOwner) : Observable<PTMOwner>{
    return this.http.post<PTMOwner>(`${this.baseUrl}`,PTMOwner);
  }

  public updatePTMOwner(PTMOwner: PTMOwner) : Observable<PTMOwner>{
    return this.http.put<PTMOwner>(`${this.baseUrl}`,PTMOwner);
  }
  public deletePTMOwner(id: number) : Observable<PTMOwner>{
    return this.http.delete<PTMOwner>(`${this.baseUrl}/${id}`);
  }
}
