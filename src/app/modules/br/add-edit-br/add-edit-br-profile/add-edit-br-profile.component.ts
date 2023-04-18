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
import { MenuItem, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  standalone:true,
  selector: 'app-add-edit-br-profile',
  templateUrl: './add-edit-br-profile.component.html',
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
    InputSwitchModule,
    InputTextareaModule

  ]})
export class AddEditBrProfileComponent implements OnInit {
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  level!: any[];
  profile!: any[];
  onFarSite!: any[];
  category!: any[];
  serviceLC!: any[];
  company!: any[];

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
      level: new FormControl(null, [Validators.required]),
      onFarSite: new FormControl(null),
      category: new FormControl(null, [Validators.required]),
      serviceLC: new FormControl(null),
      company: new FormControl(null),
      nDays: new FormControl(null),
      salesPrice: new FormControl(null),
      iban: new FormControl(null),
      placeOfExecution: new FormControl(null),
      apllyCP: new FormControl(null),
      apllyITE: new FormControl(null),
      otherExpertise: new FormControl(null, [Validators.required]),

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
