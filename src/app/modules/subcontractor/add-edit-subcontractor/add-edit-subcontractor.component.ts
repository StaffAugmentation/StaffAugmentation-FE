import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { SubContractorService } from '@services/subContractor.service';
import { ApproverService } from '@services/approver.service';
import { TypeOfCostService } from '@services/typeOfCost.service';
import { PaymentTermService } from '@services/paymentTerm.service';
import { PaymentTerm } from '@models/paymentTerm';
import { TypeOfCost } from '@models/typeOfCost';
import { SubContractor } from '@models/subContractor';
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
  selectedValue!: SubContractor;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  approvers: Approvers[] = [];
  typeOfCost: TypeOfCost[] = [];
  paymentTerm: PaymentTerm[] = [];
  constructor(private ref: DynamicDialogRef, private typeOfCostService: TypeOfCostService , private paymentTermService: PaymentTermService , private subContractorService: SubContractorService, private toast: MessageService, public config: DynamicDialogConfig , private approverService: ApproverService) {
    this.getApprovers();
    this.getTypeOfCost();
    this.getPaymentTerm();
  }
  ngOnInit(): void {
    this.id = this.config.data?.idSubContractor;
    this.initForm(null);
    if (this.id) {
      this.subContractorService.getOne(this.id).subscribe({
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
          return { ...appr, displayLabel: appr.appFirstName + ' ' + appr.appLastName }; });
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
          return { ...type, displayLabel: type.typeOfCostValue}; });
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
          return { ...payment, displayLabel: payment.paymentTermValue}; });
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
        this.subContractorService.updateSubContractor(new SubContractor(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.subContBa,
          this.addEditForm.value.subContBicsw,
          this.addEditForm.value.subContVatRate,
          this.addEditForm.value.isOfficial,
          this.addEditForm.value.idApproverSub,
          this.addEditForm.value.legalEntityName,
          this.addEditForm.value.legalEntityAdress,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.idNumber,
          this.addEditForm.value.idPaymentTerm,
          this.addEditForm.value.idTypeOfCost
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "SubContractor updated successfuly" });
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
        this.subContractorService.addSubContractor(new SubContractor(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.subContBa,
          this.addEditForm.value.subContBicsw,
          this.addEditForm.value.subContVatRate,
          this.addEditForm.value.isOfficial,
          this.addEditForm.value.idApproverSub,
          this.addEditForm.value.legalEntityName,
          this.addEditForm.value.legalEntityAdress,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.idNumber,
          this.addEditForm.value.idPaymentTerm,
          this.addEditForm.value.idTypeOfCost
        )
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "SubContractor added successfuly" });
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
  initForm(data: SubContractor | null): void {
    this.addEditForm = new FormGroup({
      valueId: new FormControl(data ? data.valueId : null, [Validators.required]),
      subContBa: new FormControl(data ? data.subContBa : null),
      subContBicsw: new FormControl(data ? data.subContBicsw : null),
      subContVatRate: new FormControl(data ? data.subContVatRate : null),
      isOfficial: new FormControl(data ? data.isOfficial : false),
      idApproverSub: new FormControl(data ? data.idApproverSub : null),
      legalEntityName: new FormControl(data ? data.legalEntityName : null),
      legalEntityAdress: new FormControl(data ? data.legalEntityAdress : null),
      vatNumber: new FormControl(data ? data.vatNumber : null),
      idNumber: new FormControl(data ? data.idNumber : null),
      idPaymentTerm: new FormControl(data ? data.idPaymentTerm : null),
      idTypeOfCost: new FormControl(data ? data.idTypeOfCost : null),
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
