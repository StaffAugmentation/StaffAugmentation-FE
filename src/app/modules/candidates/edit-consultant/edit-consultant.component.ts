import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-edit-consultant',
  templateUrl: './edit-consultant.component.html',
  styleUrls: ['./edit-consultant.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    TabViewModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
    InputTextareaModule,
    SplitButtonModule,
    FileUploadModule,
    HttpClientModule,
    CheckboxModule,
    DialogModule
  ]
})
export class EditConsultantComponent implements OnInit {

  editForm!: FormGroup;
  addForm!: FormGroup;
  addReferralForm!: FormGroup;
  isSubmited: boolean = false;
  isSubmited2: boolean = false;
  isSubmitedReferral: boolean = false;
  actionLoading: boolean = false;
  selectedConsultant: any;
  maxDate!: Date;
  currency:any[]=[];
  contract:any[]=[];
  selectedInterviews: any;
  colsInterview: any[]=[];
  interviews: TreeNode[]= [];
  selectedReferral: any;
  colsReferral: any[]=[];
  referrals: TreeNode[]= [];
  interviewFees:any[]=[];
  selectedInterviewFees: any;
  colsInterviewFees: any[]=[];
  referralFees:any[]=[];
  selectedReferralFees: any;
  colsReferralFees: any[]=[];
  history:any[]=[];
  selectedHistory: any;
  colsHistory: any[]=[];
  visible: boolean=false;
  contactRec: any[]=[];

  constructor(private toast: MessageService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.selectedConsultant = this.config.data?.consultant;
    this.initForm(this.selectedConsultant);
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate());
    
    this.contract=[
      { field: 'Employee'},
      { field: 'Freelance'},
      { field: 'Freelancer - Third Party'},
      { field: 'Subcontractor'},
    ];

    this.addForm = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      interviewCost: new FormControl(null, [Validators.required]),
      currency: new FormControl(null),
      comment: new FormControl(null),
    });

    this.colsInterview = [
      { field: 'date', header: 'Date' },
      { field: 'cost', header: 'Cost' },
      { field: 'paymentStatus', header: 'Payment status' },
      { field: 'comment', header: 'Comment' },
    ];

    this.addReferralForm= new FormGroup({
      proposedBy: new FormControl(null, [Validators.required]),
      referent: new FormControl(null, [Validators.required]),
      referralDate: new FormControl(null, [Validators.required]),
      referralCost: new FormControl(null, [Validators.required]),
      referralCurrency: new FormControl(null),
      referralComment: new FormControl(null),
    });

    this.colsReferral = [
      { field: 'referent', header: 'Referent' },
      { field: 'date', header: 'Date' },
      { field: 'cost', header: 'Cost' },
      { field: 'comment', header: 'Comment' },
      { field: 'paymentStatus', header: 'Payment status' },
    ];

    this.colsInterviewFees = [
      { field: 'invoicingPeriod', header: 'Invoicing period' },
      { field: 'totalAmounr', header: 'Total amount' },
      { field: 'invoice date', header: 'Invoice date' },
      { field: 'paymentStatus', header: 'Payment status' },
    ];

    this.colsReferralFees = [
      { field: 'invoicingPeriod', header: 'Invoicing period' },
      { field: 'referent', header: 'Referent' },
      { field: 'totalAmounr', header: 'Total amount' },
      { field: 'invoice date', header: 'Invoice date' },
      { field: 'paymentStatus', header: 'Payment status' },
    ];

    this.colsHistory = [
      { field: 'action', header: ' ' },
      { field: 'request', header: 'Request' },
      { field: 'typeBR', header: 'Type BR' },
      { field: 'fwc', header: 'FWC' },
      { field: 'profile', header: 'Profile' },
      { field: 'level', header: 'Level' },
      { field: 'performance', header: 'Performance' },
      { field: 'daysHours', header: 'Days/Hours' },
      { field: 'cost', header: 'Cost' },
      { field: 'margin', header: 'Margin' },
    ];
  }
  
  initForm(data: any): void {
    this.editForm = new FormGroup({
      consultantName: new FormControl(data.consultantName , [Validators.required]),
      consultantSurname: new FormControl(data.consultantSurname , [Validators.required]),
      role: new FormControl(data.role),
      resourcePhone: new FormControl(data.resourcePhone),
      resourceEmail: new FormControl(data.resourceEmail),
      idNumber: new FormControl(data.idNumber),
      nationality: new FormControl(data.nationality),
      legalEntityName: new FormControl(data.legalEntityName),
      vatNumber: new FormControl(data.vatNumber),
      earliestStartDate: new FormControl(data.earliestStartDate, [Validators.required]),
      birthdate: new FormControl(data.birthdate),
      cost: new FormControl(data.cost),
      costCurrency: new FormControl(data.costCurrency),
      thirdPartyRate: new FormControl(data.thirdPartyRate),
      rateCurrency: new FormControl(data.rateCurrency),
      companyRegistrationNumber: new FormControl(data.companyRegistrationNumber),
      legalEntityCountry: new FormControl(data.legalEntityCountry),
      typeOfContract: new FormControl(data.typeOfContract, [Validators.required]),
      vat: new FormControl(data.vat),
      sapVendor: new FormControl(data.sapVendor, [Validators.required]),
      highestDegree: new FormControl(data.highestDegree, [Validators.required]),
      dateItCareerStarted: new FormControl(data.dateItCareerStarted, [Validators.required]),
      employeeNumber: new FormControl(data.employeeNumber, [Validators.required]),
      legalEntityAddress: new FormControl(data.legalEntityAddress),
      comment: new FormControl(data.comment),
      paymentTerms: new FormControl(data.paymentTerms),
      acceleratePayments: new FormControl(data.acceleratePayments),
      numberPayment: new FormControl({ value: data.numberPayment, disabled: true }),
      paymentAccelerated: new FormControl({ value: data.paymentAccelerated, disabled: true }),
      projectCode: new FormControl(data.projectCode),
      ibanNumber: new FormControl(data.ibanNumber),
      typeOfCost: new FormControl(data.typeOfCost),
      bicSwift: new FormControl(data.bicSwift),
      approver: new FormControl(data.approver),
      clientProjectManager: new FormControl(data.clientProjectManager),
      clientProjectManagerContact: new FormControl(data.clientProjectManagerContact),
      riskOfDeparture: new FormControl(data.riskOfDeparture),
      riskDeparture: new FormControl({ value: data.riskDeparture, disabled: true }),
      plannedLeaveDate: new FormControl(data.plannedLeaveDate),
    })
  }  

  nodeSelect(event:any) {
    this.toast.add({ severity: 'info', summary: 'row Selected' });
  }

  nodeUnselect(event:any) {
      this.toast.add({ severity: 'warn', summary: 'row Unselected'});
  }

  onSubmit(): void {
    this.isSubmited = true;
    if (this.editForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  contactRecruitment(): void {
    this.visible = true;
  }

  downloadAll(): void {

  }

  close(): void {
    this.ref.close();
  }

  add(): void {
    this.isSubmited2 = true;
    if (this.addForm.valid) {
    }
  }

  processForPayment(): void {
    if(this.selectedInterviews?.id){
      
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

  addReferral(): void {
    this.isSubmitedReferral = true;
    if (this.addReferralForm.valid) {
    }
  }

  processForPaymentReferral(): void {
    if(this.selectedReferral?.id){
      
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

}
