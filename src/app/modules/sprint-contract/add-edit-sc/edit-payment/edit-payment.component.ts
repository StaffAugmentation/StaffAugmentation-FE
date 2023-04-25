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
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  standalone: true,
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
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
    DialogModule,
    InputSwitchModule
  ]
})
export class EditPaymentComponent implements OnInit {

  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addForm!: FormGroup;
  typeOfCost:any[]=[];
  approver:any[]=[];
  cols:any[]=[];
  payment:any;
  oerp:any[]=[];
  performances:any[]=[];
  colsPerformance:any[]=[];
  provisionPerformances:any[]=[];
  colsProvisionPerformance:any[]=[];
  generals:any[]=[];
  colsGeneral:any[]=[];
  visible: boolean=false;
  creditInvoice: any[]=[];
  disabledDates: Date[] = [];
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.payment = this.config.data?.payment;
    this.initForm(this.payment);
    
    this.getDisabledDates();

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

  getDisabledDates():void{
    for (let year = 1900; year <= 2300; year++) {
      for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
          if (day !== 10 && day !== 25) {
            let date = new Date(year, month, day);
            if (date.getMonth() === month) {
              this.disabledDates.push(date);
            }
          }
        }
      }
    }
  }

  initForm(data:any):void {
    this.addForm = new FormGroup({
      invoicingPeriodStart: new FormControl({value:data.invoicingPeriod.substring(0, 10), disabled: true}),
      invoicingPeriodEnd: new FormControl({value:data.invoicingPeriod.slice(-10), disabled: true}),
      totalAmount: new FormControl({value:data.totalAmount, disabled: true},[Validators.required]),
      vatAmount: new FormControl({value:data.vatAmount, disabled: true}),
      invoiceSubtotal: new FormControl({value:data.invoiceSubtotal, disabled: true}),
      invoiceReference: new FormControl(data.invoiceReference,[Validators.required]),
      invoiceDate: new FormControl(data.invoiceDate,[Validators.required]),
      paymentSchedule: new FormControl(data.paymentSchedule,[Validators.required]),
      nttDataEntity: new FormControl({value:data.nttDataEntity, disabled: true},[Validators.required]),
      legalEntityName: new FormControl({value:data.legalEntityName, disabled: true},[Validators.required]),
      vatLegalEntity: new FormControl({value:data.vatLegalEntity, disabled: true}),
      typeOfCost: new FormControl(data.typeOfCost,[Validators.required]),
      bicSwift: new FormControl(data.bicSwift,[Validators.required]),
      poReference: new FormControl(data.poReference),
      approver: new FormControl(data.approver,[Validators.required]),
      ibanNumber: new FormControl(data.ibanNumber,[Validators.required]),
      comment: new FormControl(data.comment),
      onHold: new FormControl(false),
      invoiceDocument: new FormControl({value:data.invoiceDocument, disabled: true}),
      approvalProof: new FormControl({value:data.approvalProof, disabled: true}),
      sapVendor: new FormControl(data.sapVendor),
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

  generateCreditNote():void{
    this.visible = true;
  }

  upload():void{

  }

}
