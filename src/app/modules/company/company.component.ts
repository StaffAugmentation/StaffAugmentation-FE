import { Component, OnInit } from '@angular/core';
import { Company } from '@models/company';
import { CompanyService } from '@services/company.service';
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
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Approvers } from '@models/approvers';
import { ApproverService } from '@services/approver.service';

@Component({
  standalone: true,
  selector: 'app-company',
  templateUrl: './company.component.html',
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

export class CompanyComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listCompany: Company[] = [];
  selectedCompany!: Company | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'companyName', label: 'Company name' },
      { id: 'bankAccount', label: 'IBAN Number' },
      { id: 'cmpEmail', label: 'Email' },
      { id: 'cmpVatlegalEntity', label: 'VAT legal entity' },
      { id: 'cmpBicsw', label: 'BIC/SW' },
      { id: 'approverName', label: 'Approver' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';
  approvers: Approvers[] = [];

  constructor(private companyService: CompanyService, private approverService: ApproverService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private toast: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getCompanies();
  }

  getCompanies(): void {
    this.tableOptions.loading = true;
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.listCompany = res;
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
    this.getCompanies();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditCompanyComponent, {
        header: `Add company`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
      });
    }
    else if (this.selectedCompany?.idCompany) {
      this.modalAddEdit = this.modalService.open(AddEditCompanyComponent, {
        header: `Edit company`,
        style: { width: '95%', maxWidth: '750px' },
        data: { idCompany: this.selectedCompany.idCompany }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
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
    this.selectedCompany = null;
    table.clear();
  }

  delete(): void {
    if (this.selectedCompany?.idCompany) {
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
          this.companyService.deleteCompany(this.selectedCompany?.idCompany || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Company deleted successfuly" });
              this.getCompanies();
              this.selectedCompany = null;
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
