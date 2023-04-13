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
    CalendarModule
  ]
})
export class AddEditScComponent implements OnInit {

  selectedSC: any
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  action!: string;
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit(): void {
    this.selectedSC = this.config.data?.springContract;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }
    this.initForm(this.selectedSC);
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
    });
  }
  
  businessRequest():void {

  }

  terminateContract():void {

  }
  generateNTTDataContract():void {

  }

  close(): void {
    this.ref.close();
  }

}
