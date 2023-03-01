import { Component, OnInit } from '@angular/core';
import { Company } from '@models/company';
import { CompanyService } from '@services/company.service';
import { MessageService } from 'primeng/api';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';

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
    OverlayPanelModule
  ],
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


  company: Company[] = [];
  constructor(private companyService: CompanyService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef) { 
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
        header: `Add Company`,
        width: '60%',
        height: '50',
        data: {
          company: this.listCompany[0]
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
      });
    }
    else if (this.selectedCompany?.idCompany) {
      this.modalAddEdit = this.modalService.open(AddEditCompanyComponent, {
        header: `Edit Company`,
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

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }


}


