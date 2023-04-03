import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { RecruitmentService } from '@services/recruitment.service';
import { ApproverService } from '@services/approver.service';
import { TypeOfCostService } from '@services/typeOfCost.service';
import { PaymentTermService } from '@services/paymentTerm.service';
import { PaymentTerm } from '@models/paymentTerm';
import { TypeOfCost } from '@models/typeOfCost';
import { Recruitment } from '@models/recruitment';
import { Approvers } from '@models/approvers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  standalone: true,
  selector: 'app-add-edit-recruitment',
  templateUrl: './add-edit-recruitment.component.html',
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
    TabViewModule,
    DropdownModule,
    CheckboxModule
  ]
})
export class AddEditRecruitmentComponent implements OnInit {

  id!: number;
  selectedValue!: Recruitment;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  approvers: Approvers[] = [];
  typeOfCost: TypeOfCost[] = [];
  paymentTerm: PaymentTerm[] = [];
  constructor(private ref: DynamicDialogRef, private recruitmentService: RecruitmentService, private toast: MessageService, public config: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.id = this.config.data?.idRecruitment;
    this.initForm(null);
    if (this.id) {
      this.recruitmentService.getOne(this.id).subscribe({
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
        this.recruitmentService.updateRecruitment(new Recruitment(
          this.id,
          this.addEditForm.value.name,
          this.addEditForm.value.email
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "Recruitment updated successfuly" });
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
        this.recruitmentService.addRecruitment(new Recruitment(
          this.id || 0,
          this.addEditForm.value.name,
          this.addEditForm.value.email,
        )
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Recruitment added successfuly" });
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
  initForm(data: Recruitment | null): void {
    this.addEditForm = new FormGroup({
      name: new FormControl(data ? data.name: null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl(data ? data.email : null, [Validators.required, Validators.email]),
    });
  }
  getErrorMessage(field: string, error: any): string {
    if (error?.required)
      return `${field} is required`;
    if (error?.minlength)
      return `${field} have to be more than 3 letters`;
    if (error?.maxlength)
      return `${field} have to be less than 30 letters`;
    if (error?.email)
    return `${field} format not valid`;
    return '';
  }
  close() {
    this.ref.close();
  }
}
