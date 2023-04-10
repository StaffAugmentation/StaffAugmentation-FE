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
  today!:Date
  minDate!: Date;
  maxDate!: Date;
  disabledDates: Date[] = [];
  constructor() { }
  ngOnInit(): void {
    this.today = new Date();
    this.minDate = new Date("4/1/2023");
    this.maxDate = new Date("5/1/2023");

    this.getDisabledDates();
  }

  getDisabledDates():void{
    for (let i = 1; i <= 31; i++) {
      if (i !== 10 && i !== 20) {
        this.disabledDates.push(new Date(this.today.getFullYear(), this.today.getMonth(), i));
      }
    }
  }

}
