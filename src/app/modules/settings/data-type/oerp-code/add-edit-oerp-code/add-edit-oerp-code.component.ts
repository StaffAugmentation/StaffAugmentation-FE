import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { OERPCodeService } from '@services/oerp-code.service';
import { OERPCode } from '@models/oerp-code';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-oerp-code',
  templateUrl: './add-edit-oerp-code.component.html',
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
export class AddEditOERPCodeComponent implements OnInit {

  id!: number;
  selectedValue!: OERPCode;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private OERPCodeService: OERPCodeService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.id;
    this.initForm(null);
    if (this.id) {
      this.OERPCodeService.getOne(this.id).subscribe({
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
        this.OERPCodeService.updateOERPCode(new OERPCode(
          this.id || 0,
          this.addEditForm.value.value,
          this.addEditForm.value.isActive
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "OERP Code updated successfuly" });
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
        this.OERPCodeService.addOERPCode(new OERPCode(
          this.id || 0,
          this.addEditForm.value.value,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "OERPCode added successfuly" });
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
  initForm(data: OERPCode | null): void {
    this.addEditForm = new FormGroup({
      value: new FormControl(data ? data.value : '', [Validators.required]),
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
