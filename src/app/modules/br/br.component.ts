import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { AddEditBrComponent } from './add-edit-br/add-edit-br.component';
import { Table, TableModule } from 'primeng/table';
import { FileExporterService } from 'src/app/services/file-exporter.service'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { BusinessRequestService } from 'src/app/services/business-request.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  standalone: true,
  selector: 'app-br',
  templateUrl: './br.component.html',
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    DropdownModule,
    OverlayPanelModule,
    CardModule,
    AutoCompleteModule
  ]
})
export class BrComponent implements OnInit {
  advancedSearch: any = {
    requestNumber: '',
    status: [],
    frameworkContract: [],
    dtRfReceived: new Date()
  };
  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listBR: any[] = [];
  selectedBR: any = {};
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'Request_number', label: 'Request Number' },
      { id: 'Status', label: 'Status'},
    ],
    loading: false,
    exportLoading: false
  };

  constructor(
    private brService: BusinessRequestService,
    private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private fileExporter: FileExporterService) { }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getBr();
  }
  
  getBr(): void {
    this.tableOptions.loading = true;

    this.brService.get().subscribe({
      next: (res) => {
        this.listBR = [res];
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

  search(): void {
    this.isCollapsed.advancedSearch = true;
    this.isCollapsed.list = false;
    this.tableOptions.loading = true;
    this.brService.getAll().subscribe({
      next: res => {
        this.listBR = res;
        this.tableOptions.loading = false;
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Search error', detail: 'An error on the server' });
        this.tableOptions.loading = false;
        this.isCollapsed.advancedSearch = false;
      }
    })
  }

  addEdit(action: string): void {
    if(action == 'add'){
      this.modalAddEdit = this.modalService.open(AddEditBrComponent, {
        width: '80%',
        height: '90%',
        data: {
          action: 'add'
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        console.log(res);
      });
    }
    else if(this.selectedBR?.id){
      this.modalAddEdit = this.modalService.open(AddEditBrComponent, {
        header: `Edit Business Request`,
        width: '80%',
        height: '95%',
        data: {
          businessRequest: this.selectedBR
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        console.log(res);
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
    
  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table, event: Event): void {
    console.log(table);

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    if (!Array.isArray(this.listBR)) {
      this.listBR = [this.listBR];
    }

    this.fileExporter.exportExcelBR(this.listBR.map(br => {
      let appr: any = { 
      'Request number' : br.Request_number,
      'Status' : br.Status,
      'Department' : br.Department,
      'Next action' :br.NextActionDate,
      'Service type': br.TypeBR,
      'Department email':br.DG_Email,
      'Contact name':br.Contact_Name,
      'Open/Intended':br.OpenIntendedComment,
      'Request form status':br.DataProfile.filter((obj: { RequestFormStatus: string | null }) => obj && obj.RequestFormStatus !== null)
      .map((obj: { RequestFormStatus: string | null }) => obj.RequestFormStatus)
      .join(';'),
      'Technical contact':br.TechnicalContact,
      'Framework contract':br.TypeOfContract,
      'Source':br.SourceBR,
      'Date RF received':br.dt_RFReceived,
      'Acknowledgement':br.dt_Acknowledgement,
      'Acknowledgement deadline':br.dt_AcknowledgementDeadline,
      'Yes/No sent to customer':br.DataProfile.filter((obj: { dt_SentToCustomer: string | null }) => obj && obj.dt_SentToCustomer !== null)
      .map((obj: { dt_SentToCustomer: string | null }) => obj.dt_SentToCustomer)
      .join(';'),
      'Proposal (Deadline)':br.dt_ProposalDeadline,
      'Date proposal is submitted to customer':br.DataProfile.filter((obj: { dt_Proposal_Is_Submitted_To_Customer: string | null }) => obj && obj.dt_Proposal_Is_Submitted_To_Customer !== null)
      .map((obj: { dt_Proposal_Is_Submitted_To_Customer: string | null }) => obj.dt_Proposal_Is_Submitted_To_Customer)
      .join(';'),
      'Date FO is submitted to customer':br.DataProfile.filter((obj: { dt_FO_Is_Submitted_To_Customer: string | null }) => obj && obj.dt_FO_Is_Submitted_To_Customer !== null)
      .map((obj: { dt_FO_Is_Submitted_To_Customer: string | null }) => obj.dt_FO_Is_Submitted_To_Customer)
      .join(';'),
      'Proximity':br.Proximity,
      'Company':br.DataProfile.filter((obj: { CompanyName: string | null }) => obj && obj.CompanyName !== null)
      .map((obj: { CompanyName: string | null }) => obj.CompanyName)
      .join(';'),
      'Place of delivery':br.PlaceOfDelivery,
      'Profile':br.DataProfile.filter((obj: { Profile: string | null }) => obj && obj.Profile !== null)
      .map((obj: { Profile: string | null }) => obj.Profile)
      .join(';'),
      'Category':br.DataProfile.filter((obj: { Category: string | null }) => obj && obj.Category !== null)
      .map((obj: { Category: string | null }) => obj.Category)
      .join(';'),
      'Level':br.DataProfile.filter((obj: { Level: string | null }) => obj && obj.Level !== null)
      .map((obj: { Level: string | null }) => obj.Level)
      .join(';'),
      'Service level category':br.DataProfile.filter((obj: { Service_Level_Category: string | null }) => obj && obj.Service_Level_Category !== null)
      .map((obj: { Service_Level_Category: string | null }) => obj.Service_Level_Category)
      .join(';'),
      'Expected project start date':br.Expected_Project_Start_Date,
      'TOTAL man days | TOTAL man hours':br.TOTAL_man_days,
      'Other expertise required':br.DataProfile.filter((obj: { Other_Expertise_Required: string | null }) => obj && obj.Other_Expertise_Required !== null)
      .map((obj: { Other_Expertise_Required: string | null }) => obj.Other_Expertise_Required)
      .join(';'),
      'Date SC is received':br.dt_SC_Is_Received,
      'Date SC is signed':br.dt_SC_Is_signed,
      'Project start date':br.Project_Start_Date,
      'Maximum end date':br.Max_End_Date,
      'Ext max end date':br.Ext_Max_End_Date,
      'Number of days | Number of  hours':br.Number_Of_Days,
      'IBAN Number':br.DataProfile.filter((obj: { Bank_Account: string | null }) => obj && obj.Bank_Account !== null)
      .map((obj: { Bank_Account: string | null }) => obj.Bank_Account)
      .join(';'),
      'Validity date':br.DataProfile.filter((obj: { Validity_Date: string | null }) => obj && obj.Validity_Date !== null)
      .map((obj: { Validity_Date: string | null }) => obj.Validity_Date)
      .join(';'),
      'Sales price':br.DataProfile.filter((obj: { Daily_Price: string | null }) => obj && obj.Daily_Price !== null)
      .map((obj: { Daily_Price: string | null }) => obj.Daily_Price)
      .join(';'),
      'Total price':br.Total_Price,
      'Consultant':Object.values(br.Consultant).join(';'),
      'SC created':br.isSCCreated,
      'General comment':br.GeneralComment,
    };
      return appr;
    }), 'BusinessRequest').finally(() => this.tableOptions.exportLoading = false);
  }

}
