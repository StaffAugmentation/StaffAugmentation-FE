import { Component, OnInit } from '@angular/core';
import { Department } from '@models/department';
import { DepartmentService } from '@services/department.service';
import { MessageService } from 'primeng/api';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-department',
  templateUrl: './department.component.html',
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
  ],
  providers: [ConfirmationService],
  animations: [
    trigger('showHide', [
      state('true', style({
        height: 0,
        opacity: 0,
        marginTop: 0
      })),
      state('false', style({
        height: 'fit-content',
        opacity: 1,
        marginTop: 12
      })),
      transition('true => false', [
        animate('300ms ease-out', keyframes([
          style({ height: 'fit-content' }),
          style({ opacity: 1, marginTop: 12 })
        ]))
      ]),
      transition('false => true', [
        animate('300ms  ease-in', keyframes([
          style({ opacity: 0, height: '0', marginTop: 0 })
        ]))
      ]),
    ])
  ]
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
      { id: 'ValueId', label: 'Value' },
      { id: 'IsActive', label: 'State' }
    ],
    loading: false,
    exportLoading: false
  };

  Company: Department[] = [];
  constructor(private departmentService: DepartmentService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
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
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  refresh():void{
    this.getDepartments();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditDepartmentComponent, {
        header: `Add department`,
        width: '60%',
        height: '50',
        data: {
          Department: this.listDepartment[0]
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getDepartments();
      });
    }
    else if (this.selectedDepartment?.Id) {
      this.modalAddEdit = this.modalService.open(AddEditDepartmentComponent, {
        header: `Edit department`,
        width: '60%',
        height: '50',
        data: {
          id: this.selectedDepartment.Id,
          valueId:this.selectedDepartment.ValueId,
          isActive:this.selectedDepartment.isActive,
        }
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

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  delete():void{
    if (this.selectedDepartment?.Id) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete '+this.selectedDepartment.ValueId,
        header: 'Confirm',
        icon:'pi pi-exclamation-triangle',
        accept: () => {
          this.departmentService.deleteDepartment(this.selectedDepartment.Id).subscribe({
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

}
