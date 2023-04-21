import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  providers: [MessageService],
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
export class EditProfileComponent implements OnInit {

  profile!: any[];
  requestFS!: any[];
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  editForm!: FormGroup;

  constructor(private ref: DynamicDialogRef, public toast: MessageService) { }

  ngOnInit(): void {
    this.initForm(null);
  }

  onSubmit() {
    this.isSubmited = true;
    this.ref.close();
  }
  initForm(data: null): void {
    this.editForm = new FormGroup({
      profile: new FormControl(null),
      requestFS: new FormControl(null, [Validators.required]),
      yesNo: new FormControl(null),
      datePSC: new FormControl(null),
      acceptanceDate: new FormControl(null),
      refusalDate: new FormControl(null),
      dateFOD: new FormControl(null),
      dateFOSC: new FormControl(null),
      validityDate: new FormControl(null),
      changeOfferD: new FormControl(null),
      changeOfferS: new FormControl(null),
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
