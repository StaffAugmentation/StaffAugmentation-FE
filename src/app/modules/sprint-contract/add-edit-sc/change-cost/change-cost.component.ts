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

@Component({
  standalone: true,
  selector: 'app-change-cost',
  templateUrl: './change-cost.component.html',
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
    SharedModule
  ]
})
export class ChangeCostComponent implements OnInit {

  consultant:any;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  consultantCost:any[]=[];
  cols:any[]=[];

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.consultant = this.config.data?.consultant;
    this.initForm(this.consultant);
    this.cols=[
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profile', header: 'Profile' },
      { field: 'changeFrom', header: 'Date from' },
      { field: 'newConsultantCost', header: 'New value' },
    ]
  }

  initForm(data:any | null):void {
    this.addEditForm = new FormGroup({
      consultant : new FormControl(data.consultantName),
      profile: new FormControl(data.profileLeveOnsiteCategory),
      changeFrom: new FormControl(null,[Validators.required]),
      newConsultantCost: new FormControl(null,[Validators.required]),
    });
  }  

  add(){
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      
    }
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
}
