import { Component, OnInit } from '@angular/core';
import { Department } from '@models/department';
import { DepartmentService } from '@services/department.service';
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
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-department',
  templateUrl: './department.component.html',
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

export class DepartmentComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listDepartment: Department[] = [];
  selectedDepartment!: Department;
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
  Department: Department[] = [];
  searchTable: string = '';

  constructor(private departmentService: DepartmentService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private fileExporter: FileExporterService,
    private confirmationService: ConfirmationService) {
    }
  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getDepartments();
  }

  getDepartments(): void {
    this.tableOptions.loading = true;

    this.departmentService.getAll().subscribe({
      next: (res) => {
        this.listDepartment = res;
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

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditDepartmentComponent, {
        header: `Add department`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getDepartments();
      });
    }
    else if (this.selectedDepartment?.id) {
      this.modalAddEdit = this.modalService.open(AddEditDepartmentComponent, {
        header: `Edit department`,
        style: { width: '90%', maxWidth: '500px' },
        data: { id: this.selectedDepartment.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getDepartments();
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

  delete():void{
    if (this.selectedDepartment?.id) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete '+this.selectedDepartment.valueId,
        header: 'Confirm',
        icon:'pi pi-exclamation-triangle',
        accept: () => {
          this.departmentService.deleteDepartment(this.selectedDepartment.id).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Department deleted successfuly" });
              this.getDepartments();
            },
            error: (err: any) => {
              this.toast.add({ severity: 'error', summary: err.error });
            }
          });
        }
      });
    } else{
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

    exportExcel(): void {
      this.tableOptions.exportLoading = true;
      // let data = this.listBR.filter(br => br)
        this.fileExporter.exportExcel(this.listDepartment.map(department =>{
          let dprt : any = {...department};
          dprt['Value'] = department.valueId;
          dprt['State'] = department.isActive;
          delete dprt['valueId'];
          delete dprt['isActive'];
          return dprt;
        }),'department').finally(()=> this.tableOptions.exportLoading = false);
      }

}
