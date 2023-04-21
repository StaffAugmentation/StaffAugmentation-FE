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
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-generate-ntt-data-contract',
  templateUrl: './generate-ntt-data-contract.component.html',
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
  ]
})
export class GenerateNttDataContractComponent implements OnInit {

  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addForm!: FormGroup;
  consultant:any;
  status:any[]=[];
  contracts:any[]=[];
  cols:any[]=[];
  action:any;
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.consultant = this.config.data?.consultant;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }
    this.initForm(this.consultant);
    this.cols = [
      { field: 'signatureDate', header: 'Signature date' },
      { field: 'maximumEndDate', header: 'Maximum end date' },
      { field: 'sentDate', header: 'Sent date' },
      { field: 'status', header: 'Status' },
      { field: 'specificProvision', header: 'Specific provision' },
      { field: 'comment', header: 'Comment' },
    ];

  }

  initForm(data:any | null):void {
    this.addForm = new FormGroup({
      consultantName: new FormControl(data ? data.consultant : null),
      sentDate: new FormControl(null,[Validators.required]),
      signatureDate: new FormControl(null),
      maximumEndDate: new FormControl(null,[Validators.required]),
      status: new FormControl(null,[Validators.required]),
      specificProvision: new FormControl(null),
      comment: new FormControl(null),
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

  downloadNTTDataContract(){

  }

}
