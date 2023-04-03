import { Injectable } from '@angular/core';
import { Forecasts } from '@models/forecasts';
import { Observable , of } from 'rxjs';

@Injectable()
export class ForecastsService {

  public getByYear(year:number) : Observable<Forecasts[]>{
    return of([
      {
        id: 1,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 1,
        workingDays: 22,
        year: 2023
      },
      {
        id: 2,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 2,
        workingDays: 22,
        year: 2023
      },
      {
        id: 3,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 3,
        workingDays: 22,
        year: 2023
      },
      {
        id: 4,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 4,
        workingDays: 22,
        year: 2023
      },
      {
        id: 5,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 5,
        workingDays: 22,
        year: 2023
      },
      {
        id: 6,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 6,
        workingDays: 22,
        year: 2023
      },
      {
        id: 7,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 7,
        workingDays: 22,
        year: 2023
      },
      {
        id: 8,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 8,
        workingDays: 22,
        year: 2023
      },
      {
        id: 9,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 9,
        workingDays: 22,
        year: 2023
      },
      {
        id: 10,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 10,
        workingDays: 22,
        year: 2023
      },
      {
        id: 11,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 11,
        workingDays: 22,
        year: 2023
      },
      {
        id: 12,
        absenteeismDays: 4,
        forecastedDays: 18,
        monthF: 12,
        workingDays: 22,
        year: 2023
      }
    ]);
  }


};
