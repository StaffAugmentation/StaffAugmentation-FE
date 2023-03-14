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
import {ConfirmationService} from 'primeng/api';

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
  selectedCompany!: Company;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'companyName', label: 'Company name' },
      { id: 'bankAccount', label: 'IBAN Number' },
      { id: 'cmpEmail', label: 'Email' },
      { id: 'cmpVatlegalEntity', label: 'VAT legal entity' },
      { id: 'cmpBicsw', label: 'BIC/SW' },
      { id: 'idApproverCmp', label: 'Approver' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';
  
  constructor(private companyService: CompanyService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService) { 
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
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  refresh():void{
    this.getCompanies();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditCompanyComponent, {
        header: `Add company`,
        width: '60%',
        height: '50',
        data: {
          Company: this.listCompany[0]
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
      });
    }
    else if (this.selectedCompany?.idCompany) {
      this.modalAddEdit = this.modalService.open(AddEditCompanyComponent, {
        header: `Edit company`,
        width: '60%',
        height: '50',
        data: {
          idCompany: this.selectedCompany.idCompany,
          companyName:this.selectedCompany.companyName,
          bankAccount:this.selectedCompany.bankAccount,
          cmpEmail:this.selectedCompany.cmpEmail,
          cmpVatLegalEntity:this.selectedCompany.cmpVatlegalEntity,
          cmpBicsw:this.selectedCompany.cmpBicsw,
          cmpVatRate:this.selectedCompany.cmpVatRate,
          idApproverCmp:this.selectedCompany.idApproverCmp,
          isEveris:this.selectedCompany.isEveris,

        }
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
    table.clear();
  }

  delete():void{
    if (this.selectedCompany?.idCompany) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete '+this.selectedCompany.companyName,
        header: 'Confirm',
        icon:'pi pi-exclamation-triangle',
        accept: () => {
          this.companyService.deleteCompany(this.selectedCompany.idCompany).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Company deleted successfuly" });
              this.getCompanies();
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
