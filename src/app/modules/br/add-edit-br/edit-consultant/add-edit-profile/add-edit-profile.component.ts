import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone:true,
  selector: 'app-add-edit-profile',
  templateUrl: './add-edit-profile.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    ToastModule,
    CalendarModule,

  ]
})
export class AddEditProfileComponent implements OnInit {
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  profile!: any[];
  typeOfContract!: any[];
  subconstractorName!: any[];
  constructor(private ref: DynamicDialogRef, public toast: MessageService, private modalService: DialogService) { }

  ngOnInit(): void {
    this.initForm(null);
  }

  onSubmit() {
    this.isSubmited = true;
    this.ref.close();
  }
  initForm(data: null): void {
    this.addEditForm = new FormGroup({
      profile: new FormControl(null, [Validators.required]),
      salesPrice: new FormControl({value: null, disabled: true}),
      numberOfDays: new FormControl({value: null, disabled: true}),
      consultantCost: new FormControl(null),
      margin: new FormControl(null),
      typeOfContract: new FormControl(null, [Validators.required]),
      expectedSD: new FormControl(null),
      subconstractorName: new FormControl({value: null, disabled: true}),
      thirdPR: new FormControl({value: null, disabled: true}),
      dayfOfTrain: new FormControl(null),
    });
  }

  getErrorMessage(field: string, error: any): string {
    if (error?.required)
      return `${field} is required`;
    return '';
  }
  close() {
    this.ref.close();
  }
}
