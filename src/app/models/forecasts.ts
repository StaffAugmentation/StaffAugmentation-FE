export class Forecasts{
  id: number;
  absenteeismDays: number;
  forecastedDays: number;
  month: number;
  workingDays: number;
  year: number;
  isChanged: boolean;
  constructor
      (
      id: number,
      absenteeismDays: number,
      forecastedDays: number,
      month: number,
      workingDays: number,
      year: number,
      isChanged: boolean,
      ){
          this.id=id,
          this.absenteeismDays=absenteeismDays,
          this.forecastedDays=forecastedDays,
          this.month=month,
          this.workingDays=workingDays,
          this.year=year,
          this.isChanged=isChanged
      }
}

