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
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  standalone:true,
  selector: 'app-edit-penalty',
  templateUrl: './edit-penalty.component.html',
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
    InputNumberModule
  ]
})
export class EditPenaltyComponent implements OnInit {
  profile!: any[];
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
      penaltyAmount: new FormControl(null),
      penaltyComment: new FormControl(null),
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
