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

@Component({
  standalone: true,
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css'],
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
    CheckboxModule
  ]
})
export class AddEditCandidateComponent implements OnInit {

  addEditForm!: FormGroup;
  addForm!: FormGroup;
  addReferralForm!: FormGroup;
  isSubmited: boolean = false;
  isSubmited2: boolean = false;
  isSubmitedReferral: boolean = false;
  actionLoading: boolean = false;
  selectedCandidate: any;
  action: any;
  maxDate!: Date;
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
  resourceType: any[]=[];
  currency: any[]=[];
  TypeOfCost: any[]=[];
  paymentTerms: any[]=[];

  constructor(private toast: MessageService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.selectedCandidate = this.config.data?.candidate;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }else{
      this.initForm(this.selectedCandidate);
    }

    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate());

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
  }


  initForm(data: any | null): void {
    this.addEditForm = new FormGroup({
      firstName: new FormControl(data ? data.firstName : null, [Validators.required]),
      lastName: new FormControl(data ? data.lastName : null, [Validators.required]),
      resourceType: new FormControl(data ? data.resourceType: null, [Validators.required]),
      legalEntityName: new FormControl(data ? data.legalEntityName: null),
      vatNumber: new FormControl(data ? data.vatNumber: null),
      idNumber: new FormControl(data ? data.idNumber: null),
      paymentTerms: new FormControl(data ? data.paymentTerms: null),
      TypeOfCost: new FormControl(data ? data.TypeOfCost: null),
      ibanNumber: new FormControl(data ? data.ibanNumber: null),
      bicSwift: new FormControl(data ? data.bicSwift: null),
      vatRate: new FormControl(data ? data.vatRate: null),
      approver: new FormControl(data ? data.approver: null),
      legalEntityAddress: new FormControl(data ? data.legalEntityAddress: null),
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
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
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
