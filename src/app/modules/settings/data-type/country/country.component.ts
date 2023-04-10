import { Component, OnInit } from '@angular/core';
import { Country } from '@models/country';
import { CountryService } from '@services/country.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AddEditCountryComponent } from './add-edit-country/add-edit-country.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-country',
  templateUrl: './country.component.html',
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
    ConfirmDialogModule
  ]
})
export class CountryComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listCountry: Country[] = [];
  selectedCountry!: Country | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'countryName', label: 'Country name' },
      { id: 'hotelCeiling', label: 'Hotel Ceiling' },
      { id: 'dailyAllowance', label: 'Daily allowance' },
      { id: 'isVisible', label: 'Visible' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private countryService: CountryService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getCountries();
  }
  getCountries(): void {
    this.tableOptions.loading = true;

    this.countryService.getAll().subscribe({
      next: (res) => {
        this.listCountry = res;
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
  refresh(): void {
    this.getCountries();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditCountryComponent, {
        header: `Add Country`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCountries();
      });
    }
    else if (this.selectedCountry?.id) {
      this.modalAddEdit = this.modalService.open(AddEditCountryComponent, {
        header: `Edit Country`,
        style: { width: '90%', maxWidth: '500px' },
        data: {
          idCountry: this.selectedCountry.id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCountries();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'Select a row.' })
    }
  }
  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }
  onGlobalFilter(table: Table): void {
    table.filterGlobal(this.searchTable, 'contains');
  }
  clearFilter(table: Table): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    table.clear();
    this.searchTable = '';
  }
  delete(): void {
    if (this.selectedCountry?.id) {
      this.confirmationService.confirm({
        message: 'You won\'t be able to revert this! ',
        header: 'Are you sure?',
        icon: 'pi pi-exclamation-circle text-yellow-500',
        acceptButtonStyleClass: 'p-button-danger p-button-raised',
        rejectButtonStyleClass: 'p-button-secondary p-button-raised',
        acceptLabel: 'Yes, delete it',
        rejectLabel: 'No, cancel',
        defaultFocus: 'reject',
        accept: () => {
          this.countryService.deleteCountry(this.selectedCountry?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Country deleted successfuly" });
              this.getCountries();
              this.selectedCountry = null;
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
      });
    } else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'Select a row.' })
    }
  }

}