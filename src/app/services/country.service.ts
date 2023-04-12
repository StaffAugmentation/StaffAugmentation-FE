import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '@models/country';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl : string = `${environment.baseUrl}api/Country`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Country[]>{
    return this.http.get<Country[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Country>{
    return this.http.get<Country>(`${this.baseUrl}/${id}`);
  }

  public addCountry(country: Country) : Observable<Country>{
    return this.http.post<Country>(`${this.baseUrl}`,country);
  }

  public updateCountry(country: Country) : Observable<Country>{
    return this.http.put<Country>(`${this.baseUrl}`,country);
  }
  public deleteCountry(id: number) : Observable<Country>{
    return this.http.delete<Country>(`${this.baseUrl}/${id}`);
  }
}
