import { Component, OnInit } from '@angular/core';
import { PlaceOfDelivery } from '@models/place-of-delivery';
import { PlaceOfDeliveryService } from '@services/place-of-delivery.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AddEditPlaceOfDeliveryComponent } from './add-edit-place-of-delivery/add-edit-place-of-delivery.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-place-of-delivery',
  templateUrl: './place-of-delivery.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})

export class PlaceOfDeliveryComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listPlaceOfDelivery: PlaceOfDelivery[] = [];
  selectedPlaceOfDelivery!: PlaceOfDelivery;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'id', label: 'Id' },
      { id: 'valueId', label: 'Value' },
      { id: 'isActive', label: 'State' }
    ],
    loading: false,
    exportLoading: false
  };
  PlaceOfDelivery: PlaceOfDelivery[] = [];
  searchTable: string = '';

  constructor(private PlaceOfDeliveryService: PlaceOfDeliveryService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private fileExporter: FileExporterService,
    private confirmationService: ConfirmationService) {
    }
  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getPlaceOfDeliverys();
  }

  getPlaceOfDeliverys(): void {
    this.tableOptions.loading = true;

    this.PlaceOfDeliveryService.getAll().subscribe({
      next: (res) => {
        this.listPlaceOfDelivery = res;
        this.tableOptions.loading = false;
      },
      error: (err: any) => {
        let errMessage:string = err.error;
        if (err.status !=400) {
          errMessage = 'Something went wrong with the server !';
        }
        this.toast.add({ severity: 'error', summary: errMessage });
      }
    });
  }

  refresh(): void {
    this.getPlaceOfDeliverys();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditPlaceOfDeliveryComponent, {
        header: `Add Place Of Delivery`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getPlaceOfDeliverys();
      });
    }
    else if (this.selectedPlaceOfDelivery?.id) {
      this.modalAddEdit = this.modalService.open(AddEditPlaceOfDeliveryComponent, {
        header: `Edit Place Of Delivery`,
        style: { width: '90%', maxWidth: '500px' },
        data: { id: this.selectedPlaceOfDelivery.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getPlaceOfDeliverys();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }

  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table): void {
    table.filterGlobal(this.searchTable, 'contains');
  }

  clearFilter(table: Table): void {
    this.searchTable = '';
    this.tableOptions.visibleCols = this.tableOptions.cols;
    table.clear();
  }

  delete(): void {
    if (this.selectedPlaceOfDelivery?.id) {
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
          this.PlaceOfDeliveryService.deletePlaceOfDelivery(this.selectedPlaceOfDelivery?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Place Of Delivery deleted successfuly" });
              this.getPlaceOfDeliverys();
              this.selectedPlaceOfDelivery == null;
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

    exportExcel(): void {
      this.tableOptions.exportLoading = true;
      // let data = this.listBR.filter(br => br)
        this.fileExporter.exportExcel(this.listPlaceOfDelivery.map(PlaceOfDelivery =>{
          let dprt : any = {...PlaceOfDelivery};
          dprt['Value'] = PlaceOfDelivery.valueId;
          dprt['State'] = PlaceOfDelivery.isActive;
          delete dprt['valueId'];
          delete dprt['isActive'];
          return dprt;
        }),'PlaceOfDelivery').finally(()=> this.tableOptions.exportLoading = false);
      }

}
