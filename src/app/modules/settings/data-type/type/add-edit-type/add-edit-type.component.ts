import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TypeService } from '@services/type.service';
import { Type } from '@models/type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-type',
  templateUrl: './add-edit-type.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    RadioButtonModule,
    ReactiveFormsModule,
    SharedModule,
    TabViewModule
  ]
})
export class AddEditTypeComponent implements OnInit {

  id!: number;
  selectedValue!: Type;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private typeService: TypeService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.idType;
    this.initForm(null);
    if (this.id) {
      this.typeService.getOne(this.id).subscribe({
        next: res => {
          this.selectedValue = res;
          this.initForm(res);
        },
        error: err => {
          let errMessage: string = err.error;
          if (err.status != 400) {
            errMessage = 'Something went wrong with the server !';
          }
          this.toast.add({ severity: 'error', summary: errMessage });
        }
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      if (this.id) {
        this.typeService.updateType(new Type(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "Type updated successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            let errMessage: string = err.error;
            if (err.status != 400) {
              errMessage = 'Something went wrong with the server !';
            }
            this.actionLoading = false;
            this.toast.add({ severity: 'error', summary: errMessage });
          }
        });

      } else {
        this.typeService.addType(new Type(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Type added successfuly" });
            this.actionLoading = false;
            this.ref.close();
          },
          error: (err: any) => {
            let errMessage: string = err.error;
            if (err.status != 400) {
              errMessage = 'Something went wrong with the server !';
            }
            this.actionLoading = false;
            this.toast.add({ severity: 'error', summary: errMessage });
          }
        });
      }

    }
  }
  initForm(data: Type | null): void {
    this.addEditForm = new FormGroup({
      valueId: new FormControl(data ? data.valueId : '', [Validators.required]),
      isActive: new FormControl(data ? data.isActive : true, [Validators.required]),
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
