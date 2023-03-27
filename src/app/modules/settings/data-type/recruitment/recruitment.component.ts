import { Component, OnInit } from '@angular/core';
import { Recruitment } from '@models/recruitment';
import { RecruitmentService } from '@services/recruitment.service';
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
import { AddEditRecruitmentComponent } from './add-edit-recruitment/add-edit-recruitment.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';

@Component({
  standalone: true,
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
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
export class RecruitmentComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listRecruitment: Recruitment[] = [];
  selectedRecruitment!: Recruitment | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'responsibleName', label: 'Responsible name' },
      { id: 'responsibleEmail', label: 'Responsible email' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private recruitmentService: RecruitmentService, private modalService: DialogService, 
    private modalAddEdit: DynamicDialogRef, private toast: MessageService,private confirmationService: ConfirmationService, 
    private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getRecruitments();
  }
  getRecruitments(): void {
    this.tableOptions.loading = true;
    this.recruitmentService.getAll().subscribe({
      next: (res) => {
        this.listRecruitment = res;
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
    this.getRecruitments();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditRecruitmentComponent, {
        header: `Add Recruitment`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getRecruitments();
      });
    }
    else if (this.selectedRecruitment?.id) {
      this.modalAddEdit = this.modalService.open(AddEditRecruitmentComponent, {
        header: `Edit Recruitment`,
        style: { width: '95%', maxWidth: '750px' },
        data: { idRecruitment: this.selectedRecruitment.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getRecruitments();
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
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.searchTable = '';
    this.selectedRecruitment = null;
    table.clear();
  }
  
  delete(): void {
    if (this.selectedRecruitment?.id) {
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
          this.recruitmentService.deleteRecruitment(this.selectedRecruitment?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Recruitment deleted successfuly" });
              this.getRecruitments();
              this.selectedRecruitment = null;
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
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

}
