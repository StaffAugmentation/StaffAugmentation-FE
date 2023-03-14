import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ApproverService } from '@services/approver.service';
import { Approvers } from '@models/approvers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-approver',
  templateUrl: './add-edit-approver.component.html',
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
export class AddEditApproverComponent implements OnInit {

  id!: number;
  selectedValue!: Approvers;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private approverService: ApproverService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.idApprover;
    this.initForm(null);
    if (this.id) {
      this.approverService.getOne(this.id).subscribe({
        next: res => {
          this.selectedValue = res;
          this.initForm(res);
        },
        error: err => {
          let errMessage: string = err.error;
          if (err.status == 0) {
            errMessage = 'Something went wrong with the server !';
          }
          this.toast.add({ severity: 'error', summary: errMessage });
        }
      })
    }
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      if (this.id) {
        this.approverService.updateApprover(new Approvers(
          this.id,
          this.addEditForm.value.appFirstName,
          this.addEditForm.value.appLastName
        )
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Approver updated successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            let errMessage: string = err.error;
            if (err.status == 0) {
              errMessage = 'Something went wrong with the server !';
            }
            this.toast.add({ severity: 'error', summary: errMessage });
          }
        });

      } else {
        this.approverService.addApprover(new Approvers(
          this.id || 0,
          this.addEditForm.value.appFirstName,
          this.addEditForm.value.appLastName)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Approver added successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            let errMessage: string = err.error;
            if (err.status == 0) {
              errMessage = 'Something went wrong with the server !';
            }
            this.toast.add({ severity: 'error', summary: errMessage });
          }
        });
      }

    }
  }
  initForm(data: Approvers | null): void {
    this.addEditForm = new FormGroup({
      appFirstName: new FormControl(data ? data.appFirstName : '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      appLastName: new FormControl(data ? data.appLastName : '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }
  getErrorMessage(field: string, error: any): string {
    if (error?.required)
      return `${field} is required`;
    if (error?.minlength)
      return `${field} have to be more than 3 letters`;
    if (error?.maxlength)
      return `${field} have to be less than 30 letters`;
    return '';
  }
  close() {
    this.ref.close();
  }
}