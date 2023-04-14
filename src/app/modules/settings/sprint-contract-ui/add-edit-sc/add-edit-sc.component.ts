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
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditConsultantComponent } from './edit-consultant/edit-consultant.component';
import { ChangeCostComponent } from './change-cost/change-cost.component';
import { SharedModule } from '@modules/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-add-edit-sc',
  templateUrl: './add-edit-sc.component.html',
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
    SharedModule
  ]
})
export class AddEditScComponent implements OnInit {

  selectedSC: any
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  action!: string;
  cols:any[]=[];
  colsConsultant:any[]=[];
  oerp:any[]=[
    {id:'1', oerpProjectCode:'EXT-024662-00139'}
  ];
  consultant:any[]=[
    {id:'1', consultantName:'Anthony Asanka', profileLeveOnsiteCategory:'consultant ; Unique ; Far site', company:'NTT data SWISS', nOfDays:'65.00'}
  ];

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig, private modalService: DialogService,
    private modalEdit: DynamicDialogRef,private toast: MessageService,private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.selectedSC = this.config.data?.springContract;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }
    this.initForm(this.selectedSC);

    this.cols = [
      { field: 'oerpProjectCode', header: 'PERP project code' },
    ];

    this.colsConsultant = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'company', header: 'Company' },
      { field: 'nOfDays', header: 'N° of days' },
      { field: 'consultantCost', header: 'Consultant cost' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'margin', header: 'Margin' },
      { field: 'daysPerformed', header: 'Days performed' },
    ];
  }

  onSubmit(): void {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  initForm(data:any | null):void {
    this.addEditForm = new FormGroup({
      requestNumber : new FormControl(data ? data.requestNumber : '', [Validators.required]),
      requestOrExtension: new FormControl(data ? data.requestOrExtension : null),
      scNumber: new FormControl(data ? data.scNumber : null),
      department: new FormControl(data ? data.department : null),
      placeOfDelivery: new FormControl(data ? data.placeOfDelivery : null),
      frameworkContract: new FormControl(data ? data.frameworkContract : null),
      signatureDate: new FormControl(data ? data.signatureDate : null),
      maximumEndDate: new FormControl(data ? data.maximumEndDate : null),
      specificClientCode: new FormControl(data ? data.specificClientCode : null),
      projectStartDate: new FormControl(data ? data.projectStartDate : null),
      contractStatus: new FormControl(data ? data.contractStatus : null),
      totalPrice: new FormControl(data ? data.totalPrice : null),
      numberOfDays: new FormControl(data ? data.numberOfDays : null), 
      nDaysTransformed: new FormControl(data ? data.nDaysTransformed : null), 
      managementFee: new FormControl(data ? data.managementFee : null),
      oerpProjectCode: new FormControl(data ? data.oerpProjectCode : '', [Validators.required]),
      maximumCost: new FormControl(data ? data.maximumCost : null),
      additionalBudget: new FormControl(data ? data.additionalBudget : null),
      mfInvoiced: new FormControl(data ? data.mfInvoiced : false),

    });
  }
  
  businessRequest():void {

  }

  terminateContract():void {

  }
  generateNTTDataContract():void {

  }

  add(): void{

  }

  changeCost(): void{
    this.modalEdit = this.modalService.open(ChangeCostComponent, {
      header: 'Change consultant cost',
      width: '80%',
      height: '85%',
      data: { consultant: this.consultant
      }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });

  }

  close(): void {
    this.ref.close();
  }

  delete(oerp:any){
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
        this.toast.add({ severity: 'info', summary: "Delete row", detail: oerp.oerpProjectCode });
      },
  
    });
  }

  editConsultant(consultant:any):void{
    this.modalEdit = this.modalService.open(EditConsultantComponent, {
      header: consultant.consultantName,
      width: '80%',
      height: '85%',
      data: {
        consultant: consultant
      }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });
  
  }

}
