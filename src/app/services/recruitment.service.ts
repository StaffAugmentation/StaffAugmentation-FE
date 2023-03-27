import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recruitment } from '@models/recruitment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  private baseUrl : string = `${environment.baseUrl}api/RecruitmentResp`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Recruitment[]>{
    return this.http.get<Recruitment[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Recruitment>{
    return this.http.get<Recruitment>(`${this.baseUrl}/${id}`);
  }

  public addRecruitment(recruitment: Recruitment) : Observable<Recruitment>{
    return this.http.post<Recruitment>(`${this.baseUrl}`,recruitment);
  }

  public updateRecruitment(recruitment: Recruitment) : Observable<Recruitment>{
    return this.http.put<Recruitment>(`${this.baseUrl}`,recruitment);
  }
  public deleteRecruitment(id: number) : Observable<Recruitment>{
    return this.http.delete<Recruitment>(`${this.baseUrl}/${id}`);
  }
}
