import { Component, OnInit } from '@angular/core';
import { OERPCode } from '@models/oerp-code';
import { OERPCodeService } from '@services/oerp-code.service';
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
import { AddEditOERPCodeComponent } from './add-edit-oerp-code/add-edit-oerp-code.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  standalone: true,
  selector: 'app-oerp-code',
  templateUrl: './oerp-code.component.html',
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
    BadgeModule
  ]
})
export class OERPCodeComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listOERPCode: OERPCode[] = [];
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'value', label: 'SA OERP Code' },
      { id: 'isActive', label: 'State' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private OERPCodeService: OERPCodeService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getOERPCodes();
  }
  getOERPCodes(): void {
    this.tableOptions.loading = true;

    this.OERPCodeService.getAll().subscribe({
      next: (res) => {
        this.listOERPCode = res;
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
    this.getOERPCodes();
  }
  addEdit(action: string, id:number): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditOERPCodeComponent, {
        header: `Add SA OERP Code`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getOERPCodes();
      });
    }
    else if (id) {
      this.modalAddEdit = this.modalService.open(AddEditOERPCodeComponent, {
        header: `Edit SA OERP Code`,
        style: { width: '90%', maxWidth: '500px' },
        data: {
          id:id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getOERPCodes();
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

  delete(id:number): void {
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
          this.OERPCodeService.deleteOERPCode(id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "OERPCode deleted successfuly" });
              this.getOERPCodes();
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
  }

}
