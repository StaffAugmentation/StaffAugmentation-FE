import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { CompanyService } from '@services/company.service';
import { Company } from '@models/company';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { Approvers } from '@models/approvers';
import { ApproverService } from '@services/approver.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    TabViewModule,
    RadioButtonModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule
  ]
})
export class AddEditCompanyComponent implements OnInit {

  id!: number;
  selectedValue!: Company;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  approvers: Approvers[] = [];
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private companyService: CompanyService, private toast: MessageService, public config: DynamicDialogConfig, private approverService: ApproverService) {
    this.getApprovers();
  }

  ngOnInit(): void {
    this.id = this.config.data?.idCompany;
    if (this.id) {
      this.companyService.getOne(this.id).subscribe({
        next: res => {
          this.selectedValue = res;
          this.initForm(res);
        },
        error: (err: any) => {
          let errMessage: string = err.error;
          if (err.status != 400) {
            errMessage = 'Something went wrong with the server !';
          }
          this.toast.add({ severity: 'error', summary: errMessage });
        }
      })
    }
    else {
      this.initForm(null);
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

  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      if (this.id) {
        this.companyService.updateCompany(new Company(
          this.id,
          this.addEditForm.value.companyName,
          this.addEditForm.value.ibanNumber,
          false,
          this.addEditForm.value.isNTTData,
          this.addEditForm.value.vatLegal,
          this.addEditForm.value.bic,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.approver,
          this.addEditForm.value.cmpEmail)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Company updated successfuly" });
            this.ref.close();
            this.actionLoading = true;
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
        this.companyService.addCompany(new Company(
          this.id || 0,
          this.addEditForm.value.companyName,
          this.addEditForm.value.ibanNumber,
          false,
          this.addEditForm.value.isNTTData,
          this.addEditForm.value.vatLegal,
          this.addEditForm.value.bic,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.approver,
          this.addEditForm.value.cmpEmail)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Company added successfuly" });
            this.ref.close();
            this.actionLoading = true;
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

  initForm(data: Company | null): void {
    this.addEditForm = new FormGroup({
      companyName: new FormControl(data ? data.companyName : '', [Validators.required]),
      ibanNumber: new FormControl(data ? data.bankAccount : null),
      cmpEmail: new FormControl(data ? data.cmpEmail : '', [Validators.required, Validators.email]),
      vatLegal: new FormControl(data ? data.cmpVatlegalEntity : null),
      bic: new FormControl(data ? data.cmpBicsw : null),
      approver: new FormControl(data ? data.idApproverCmp : null),
      vatRate: new FormControl(data ? data.cmpVatRate : null),
      isNTTData: new FormControl(data ? data.isEveris : false),
    });
  }

  close() {
    this.ref.close();
  }
}
