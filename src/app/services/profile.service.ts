import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '@models/profile';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl : string = `${environment.baseUrl}api/Profile`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Profile[]>{
    return this.http.get<Profile[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Profile>{
    return this.http.get<Profile>(`${this.baseUrl}/${id}`);
  }

  public addProfile(Profile: Profile) : Observable<Profile>{
    return this.http.post<Profile>(`${this.baseUrl}`,Profile);
  }

  public updateProfile(Profile: Profile) : Observable<Profile>{
    return this.http.put<Profile>(`${this.baseUrl}`,Profile);
  }
  public deleteProfile(id: number) : Observable<Profile>{
    return this.http.delete<Profile>(`${this.baseUrl}/${id}`);
  }
}
