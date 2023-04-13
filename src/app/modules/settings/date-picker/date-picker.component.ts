import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  imports:[
    CalendarModule
  ]
})
export class DatePickerComponent implements OnInit {

  date!: Date ;
  today!:Date ;
  minDate!: Date;
  maxDate!: Date;
  disabledDates: Date[] = [];
  constructor() { }
  ngOnInit(): void {
    this.today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();

    this.getDisabledDates();
  }

  getDisabledDates():void{
    // for (let year = 1900; year <= 2300; year++) {
    //   for (let month = 0; month < 12; month++) {
    //     for (let day = 1; day <= 31; day++) {
    //       if (day !== 10 && day !== 25) {
    //         let date = new Date(year, month, day);
    //         if (date.getMonth() === month) {
    //           this.disabledDates.push(date);
    //         }
    //       }
    //     }
    //   }
    // }
  }

}
