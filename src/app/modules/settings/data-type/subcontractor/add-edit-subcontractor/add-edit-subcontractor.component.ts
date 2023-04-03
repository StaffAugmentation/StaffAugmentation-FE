import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { SubcontractorService } from '@services/subcontractor.service';
import { ApproverService } from '@services/approver.service';
import { TypeOfCostService } from '@services/typeOfCost.service';
import { PaymentTermService } from '@services/paymentTerm.service';
import { PaymentTerm } from '@models/paymentTerm';
import { TypeOfCost } from '@models/typeOfCost';
import { Subcontractor } from '@models/subcontractor';
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
  selector: 'app-add-edit-subcontractor',
  templateUrl: './add-edit-subcontractor.component.html',
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
export class AddEditSubcontractorComponent implements OnInit {

  id!: number;
  selectedValue!: Subcontractor;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  approvers: Approvers[] = [];
  typeOfCost: TypeOfCost[] = [];
  paymentTerm: PaymentTerm[] = [];
  constructor(private ref: DynamicDialogRef, private typeOfCostService: TypeOfCostService , private paymentTermService: PaymentTermService , private subcontractorService: SubcontractorService, private toast: MessageService, public config: DynamicDialogConfig , private approverService: ApproverService) {
    this.getApprovers();
    this.getTypeOfCost();
    this.getPaymentTerm();
  }
  ngOnInit(): void {
    this.id = this.config.data?.idSubcontractor;
    this.initForm(null);
    if (this.id) {
      this.subcontractorService.getOne(this.id).subscribe({
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

  getApprovers(): void {
    this.approverService.getAll().subscribe({
      next: (res) => {
        this.approvers = res;
        this.approvers = this.approvers.map((appr: any) => {
          return { ...appr, displayLabel: appr.firstName + ' ' + appr.lastName }; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  getTypeOfCost(): void {
    this.typeOfCostService.getAll().subscribe({
      next: (res) => {
        this.typeOfCost = res;
        this.typeOfCost = this.typeOfCost.map((type: any) => {
          return { ...type, displayLabel: type.value}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  getPaymentTerm(): void {
    this.paymentTermService.getAll().subscribe({
      next: (res) => {
        this.paymentTerm = res;
        this.paymentTerm = this.paymentTerm.map((payment: any) => {
          return { ...payment, displayLabel: payment.value}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      if (this.id) {
        this.subcontractorService.updateSubcontractor(new Subcontractor(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.ba,
          this.addEditForm.value.bicsw,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.isOfficial,
          this.addEditForm.value.legalEntityName,
          this.addEditForm.value.legalEntityAdress,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.idNumber,
          this.addEditForm.value.approver,
          this.addEditForm.value.paymentTerm,
          this.addEditForm.value.typeOfCost
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "Subcontractor updated successfuly" });
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
        this.subcontractorService.addSubcontractor(new Subcontractor(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.ba,
          this.addEditForm.value.bicsw,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.isOfficial,
          this.addEditForm.value.legalEntityName,
          this.addEditForm.value.legalEntityAdress,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.idNumber,
          this.addEditForm.value.approver,
          this.addEditForm.value.paymentTerm,
          this.addEditForm.value.typeOfCost
        )
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Subcontractor added successfuly" });
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
  initForm(data: Subcontractor | null): void {
    this.addEditForm = new FormGroup({
      valueId: new FormControl(data ? data.valueId : null, [Validators.required]),
      ba: new FormControl(data ? data.ba : null),
      bicsw: new FormControl(data ? data.bicsw : null),
      vatRate: new FormControl(data ? data.vatRate : null),
      isOfficial: new FormControl(data ? data.isOfficial : false),
      approver: new FormControl(data ? data.approver : null),
      legalEntityName: new FormControl(data ? data.legalEntityName : null),
      legalEntityAdress: new FormControl(data ? data.legalEntityAdress : null),
      vatNumber: new FormControl(data ? data.vatNumber : null),
      idNumber: new FormControl(data ? data.idNumber : null),
      paymentTerm: new FormControl(data ? data.paymentTerm : null),
      typeOfCost: new FormControl(data ? data.typeOfCost : null),
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
