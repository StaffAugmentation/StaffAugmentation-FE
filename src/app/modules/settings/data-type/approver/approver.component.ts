import { Component, OnInit } from '@angular/core';
import { Approvers } from '@models/approvers';
import { ApproverService } from '@services/approver.service';
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
import { AddEditApproverComponent } from './add-edit-approver/add-edit-approver.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-approver',
  templateUrl: './approver.component.html',
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
export class ApproverComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listApprover: Approvers[] = [];
  selectedApprover!: Approvers | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'appFirstName', label: 'First name' },
      { id: 'appLastName', label: 'Last name' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private approverService: ApproverService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getApprovers();
  }
  getApprovers(): void {
    this.tableOptions.loading = true;

    this.approverService.getAll().subscribe({
      next: (res) => {
        this.listApprover = res;
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
    this.getApprovers();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditApproverComponent, {
        header: `Add approver`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getApprovers();
      });
    }
    else if (this.selectedApprover?.id) {
      this.modalAddEdit = this.modalService.open(AddEditApproverComponent, {
        header: `Edit approver`,
        style: { width: '90%', maxWidth: '500px' },
        data: {
          idApprover: this.selectedApprover.id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getApprovers();
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
    this.fileExporter.exportExcel(this.listApprover.map(approver => {
      let appr: any = { ...approver };
      appr['First name'] = approver.appFirstName;
      appr['Last name'] = approver.appLastName;
      delete appr['appFirstName'];
      delete appr['appLastName'];
      return appr;
    }), 'Approvers').finally(() => this.tableOptions.exportLoading = false);
  }
  delete(): void {
    if (this.selectedApprover?.id) {
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
          this.approverService.deleteApprover(this.selectedApprover?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Approver deleted successfuly" });
              this.getApprovers();
              this.selectedApprover = null;
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
