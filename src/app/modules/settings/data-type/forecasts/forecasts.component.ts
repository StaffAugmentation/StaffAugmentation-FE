import { Component, OnInit } from '@angular/core';
import { Forecasts } from '@models/forecasts';
import { ForecastsService } from '@services/forecasts.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
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

@Component({
  standalone: true,
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
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
  years!: any[];
  selectedYear!: number;
  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listForecasts: Forecasts[] = [];
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'monthF', label: 'Month' },
      { id: 'workingDays', label: 'Number of working Days' },
      { id: 'absenteeismDays', label: 'Absenteeism Days' },
      { id: 'forecastedDays', label: 'Forecasted Days' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private ForecastsService: ForecastsService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.years = [2020,2021,2022,2023];
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getForecasts();
  }
  getForecasts(): void {
    this.tableOptions.loading = true;

    this.ForecastsService.getByYear(this.selectedYear).subscribe({
      next: (res) => {
        this.listForecasts = res;
        console.log(this.listForecasts)
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
