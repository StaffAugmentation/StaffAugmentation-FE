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
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-add-edit-days-worked',
  templateUrl: './add-edit-days-worked.component.html',
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
    FileUploadModule,
    HttpClientModule
  ]
})
export class AddEditDaysWorkedComponent implements OnInit {

  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  consultant:any[]=[];
  files:any[]=[];
  cols:any[]=[];
  data:any;
  action:any;

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig,private toast: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.data = this.config.data?.data;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }
    this.initForm(this.data);
    this.cols = [
      { field: 'fileName', header: 'File name' },
    ];

  }

  initForm(data:any | null):void {
    this.addEditForm = new FormGroup({
      month : new FormControl(data ? data.month : null),
      forecast : new FormControl(data ? data.forecast : null),
      daysWorked : new FormControl(data ? data.daysWorked : null),
      consultant : new FormControl(data ? data.consultantname : null),
      daysNotInvoiceable : new FormControl(data ? data.daysNotInvoiceable : null),
      daysNotPayable : new FormControl(data ? data.daysNotPayable : null),
      oerpProjectCode : new FormControl(data ? data.oerpProjectCode : null,[Validators.required]),
      profile : new FormControl(data ? data.profile : null),

    });
  }

  onSubmit(){
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  close(){
    this.ref.close();
  }

  edit(file:any){
    this.toast.add({ severity: 'info', summary: "Edit file", detail: file});
  }

  delete(file:any){
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
        this.toast.add({ severity: 'info', summary: "Delete file", detail: file });
      },
  
    });
  }
}
