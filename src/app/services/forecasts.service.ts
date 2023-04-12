import { Injectable } from '@angular/core';
import { Forecasts } from '@models/forecasts';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ForecastsService {

  private baseUrl : string = `${environment.baseUrl}api/Forecast`;

  constructor(private http: HttpClient) { }

  public getForecastByYear(year: number) : Observable<Forecasts[]>{
    return this.http.get<Forecasts[]>(`${this.baseUrl}/${year}`);
  }

  public updateForecast(Forecast: Forecasts) : Observable<Forecasts>{
    return this.http.put<Forecasts>(`${this.baseUrl}`,Forecast);
  }

};
