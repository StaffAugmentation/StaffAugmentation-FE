import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@modules/shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  standalone: true,
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
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
    InputTextareaModule
  ]
})
export class CreditNoteComponent implements OnInit {

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
      { field: 'nOfDaysToBeCredited', header: 'N° of days to be credited' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'subtotal', header: 'Subtotal' },
    ];

    this.colsProvisionPerformance = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'nOfDaysToBeCredited', header: 'N° of days to be credited' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'subtotal', header: 'Subtotal' },
    ];

    this.colsGeneral = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'amountToBeCredited', header: 'Amount to be credited' },
    ];
  }

  initForm(data:any):void {
    this.addForm = new FormGroup({
      invoicingPeriodStart: new FormControl({value:data.invoicingPeriod.substring(0, 10), disabled: true}),
      invoicingPeriodEnd: new FormControl({value:data.invoicingPeriod.slice(-10), disabled: true}),
      creditNoteDate: new FormControl(data.creditNoteDate,[Validators.required]),
      client: new FormControl({value:data.client, disabled: true},[Validators.required]),
      nttDataEntity: new FormControl({value:data.nttDataEntity, disabled: true},[Validators.required]),
      clientPoNumber: new FormControl({value:data.clientPoNumber, disabled: true}),
      oerpInvoiceCode: new FormControl(data.oerpInvoiceCode),
      idDraft: new FormControl(data.idDraft),
      mfToBeDeducted: new FormControl({value:data.mfToBeDeducted, disabled: true}),
      totalAmount: new FormControl({value:data.totalAmount, disabled: true},[Validators.required]),
      oerpCnAmount: new FormControl({value:data.oerpCnAmount, disabled: true}),
      oerpCustomerCode: new FormControl({value:data.oerpCustomerCode, disabled: true}),
      creditNoteDescription: new FormControl(data.creditNoteDescription),
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

}
