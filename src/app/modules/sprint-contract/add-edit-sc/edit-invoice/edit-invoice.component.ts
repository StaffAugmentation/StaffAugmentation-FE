import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@modules/shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    TabViewModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    SharedModule,
    InputTextareaModule,
    DialogModule
  ]
})
export class EditInvoiceComponent implements OnInit {

  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addForm!: FormGroup;
  clients:any[]=[];
  cols:any[]=[];
  invoice:any;
  oerp:any[]=[];
  performances:any[]=[];
  colsPerformance:any[]=[];
  provisionPerformances:any[]=[];
  colsProvisionPerformance:any[]=[];
  generals:any[]=[];
  colsGeneral:any[]=[];
  visible: boolean=false;
  creditInvoice: any[]=[];

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.invoice = this.config.data?.invoice;
    this.initForm(this.invoice);
    this.cols = [
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'amount', header: 'Amount' },
    ];

    this.colsPerformance = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'nOfDays', header: 'N° of days' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'subtotal', header: 'Subtotal' },
    ];

    this.colsProvisionPerformance = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'nOfDays', header: 'N° of days' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'subtotal', header: 'Subtotal' },
    ];

    this.colsGeneral = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'amount', header: 'Amount' },
    ];

    this.creditInvoice =[
      { name: 'Apply concesion'}
    ]
  }

  initForm(data:any):void {
    this.addForm = new FormGroup({
      invoicingPeriodStart: new FormControl({value:data.invoicingPeriod.substring(0, 10), disabled: true}),
      invoicingPeriodEnd: new FormControl({value:data.invoicingPeriod.slice(-10), disabled: true}),
      invoiceDate: new FormControl(data.invoiceDate,[Validators.required]),
      client: new FormControl({value:data.client, disabled: true},[Validators.required]),
      nttDataEntity: new FormControl({value:data.nttDataEntity, disabled: true},[Validators.required]),
      clientPoNumber: new FormControl({value:data.clientPoNumber, disabled: true}),
      oerpInvoiceCode: new FormControl(data.oerpInvoiceCode),
      idDraft: new FormControl(data.idDraft),
      mfToBeDeducted: new FormControl({value:data.mfToBeDeducted, disabled: true}),
      totalAmount: new FormControl({value:data.totalAmount, disabled: true},[Validators.required]),
      oerpInvAmount: new FormControl({value:data.oerpInvAmount, disabled: true}),
      invoiceComment: new FormControl(data.invoiceComment),
    });
  }

  onSubmit(){
    this.isSubmited = true;
    if (this.addForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  close(){
    this.ref.close();
  }

  downloadFiles():void{

  }

  generateCreditNote():void{
    this.visible = true;
  }
}
