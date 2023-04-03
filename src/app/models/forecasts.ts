export class Forecasts{
  id: number;
  absenteeismDays: number;
  forecastedDays: number;
  monthF: number;
  workingDays: number;
  year: number;
  constructor
      (
      id: number,
      absenteeismDays: number,
      forecastedDays: number,
      monthF: number,
      workingDays: number,
      year: number,
      ){
          this.id=id,
          this.absenteeismDays=absenteeismDays,
          this.forecastedDays=forecastedDays,
          this.monthF=monthF,
          this.workingDays=workingDays,
          this.year=year
      }
}

