import { Component, OnInit } from '@angular/core';
import { Forecasts } from '@models/forecasts';
import { ForecastsService } from '@services/forecasts.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { BadgeModule } from 'primeng/badge';
import { DatePipe } from '@angular/common';
import { Department } from '@models/department';

@Component({
  standalone: true,
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    BadgeModule,
    DropdownModule
  ]
})

export class ForecastsComponent implements OnInit {
  years: number[] = [];
  months =[
    {id:1 , label:"January"},
    {id:2 , label:"February"},
    {id:3 , label:"March"},
    {id:4 , label:"April"},
    {id:5 , label:"Mai"},
    {id:6 , label:"June"},
    {id:7 , label:"July"},
    {id:8 , label:"August"},
    {id:9 , label:"September"},
    {id:10 , label:"October"},
    {id:11 , label:"November"},
    {id:12 , label:"December"},
  ];
  editForm!: FormGroup;
  currentMonthName: any;
  selectedYear: number = new Date().getFullYear() ;
  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listForecasts: Forecasts[] = [];
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'month', label: 'Month' },
      { id: 'workingDays', label: 'Number of working Days' },
      { id: 'absenteeismDays', label: 'Absenteeism' },
      { id: 'forecastedDays', label: 'Forecasted Days' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';
  id!: number;
  constructor(private forecastsService: ForecastsService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.currentMonthName = this.datePipe.transform(new Date(), 'MM');
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getForecasts();
    this.getYears();
  }
  getYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear-5;
    for (let year = currentYear+4; year >= startYear; year--) {
      this.years.push(year);
    }
  }

  getForecastValueByMonth(month:number , key:string): any{
    let obj:any = this.listForecasts.filter(forecast => forecast.month==month)[0];
    if (!obj){
      return 0;
    }
    return obj[key];
  }

  getForecasts(): void {
    this.tableOptions.loading = true;
    this.forecastsService.getForecastByYear(this.selectedYear).subscribe({
      next: (res) => {
        this.listForecasts = res;
        this.tableOptions.loading = false;
      },
      error: (err: any) => {
        let errMessage: string = err.error;
        if (err.status != 400) {
          errMessage = 'Something went wrong with the server !';
        }
        this.toast.add({ severity: 'error', summary: errMessage });
      }
    });
  }
  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

}


