import { Component, OnInit } from '@angular/core';
import { Type } from '@models/type';
import { TypeService } from '@services/type.service';
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
import { AddEditTypeComponent } from './add-edit-type/add-edit-type.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-type',
  templateUrl: './type.component.html',
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

export class TypeComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listType: Type[] = [];
  selectedType!: Type;
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
  Type: Type[] = [];
  searchTable: string = '';

  constructor(private typeService: TypeService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getTypes();
  }
  getTypes(): void {
    this.tableOptions.loading = true;

    this.typeService.getAll().subscribe({
      next: (res) => {
        this.listType = res;
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
    this.getTypes();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditTypeComponent, {
        header: `Add type`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getTypes();
      });
    }
    else if (this.selectedType?.id) {
      this.modalAddEdit = this.modalService.open(AddEditTypeComponent, {
        header: `Edit type`,
        style: { width: '90%', maxWidth: '500px' },
        data: {
          idType: this.selectedType.id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getTypes();
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
  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listType.map(Type => {
      let appr: any = { ...Type };
      appr['Value'] = Type.valueId;
      appr['State'] = Type.isActive;
      delete appr['valueId'];
      delete appr['isActive'];
      return appr;
    }), 'Type').finally(() => this.tableOptions.exportLoading = false);
  }
  delete(): void {
    if (this.selectedType?.id) {
      debugger
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
          this.typeService.deleteType(this.selectedType?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Type deleted successfuly" });
              this.getTypes();
              this.selectedType == null;
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
