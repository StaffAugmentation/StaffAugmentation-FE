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
import { SharedModule } from '@modules/shared/shared.module'

@Component({
  standalone: true,
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss'],
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
    SharedModule
  ]
})
export class AddEditCompanyComponent implements OnInit {

  id!: number;
  selectedValue!: Company;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private companyService: CompanyService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data.idCompany;
    if(this.id){
      this.companyService.getOne(this.id).subscribe({
        next: res=>{
          this.selectedValue = res;
          this.addEditForm = new FormGroup({
            companyName: new FormControl(res.companyName, [Validators.required]),
            ibanNumber: new FormControl(res.bankAccount),
            cmpEmail: new FormControl(res.cmpEmail, [Validators.required, Validators.email]),
            vatLegal: new FormControl(res.cmpVatlegalEntity),
            bic: new FormControl(res.cmpBicsw),
            approver: new FormControl(res.idApproverCmp),
            vatRate: new FormControl(res.cmpVatRate),
            isNTTData: new FormControl(res.isEveris),
          });
        },
        error: err => {

        }
      })
    }
    else{
      this.addEditForm = new FormGroup({
        companyName: new FormControl(null, [Validators.required]),
        ibanNumber: new FormControl(null),
        cmpEmail: new FormControl(null, [Validators.required, Validators.email]),
        vatLegal: new FormControl(null),
        bic: new FormControl(null),
        approver: new FormControl(null),
        vatRate: new FormControl(null),
        isNTTData: new FormControl(false),
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      if(this.id){
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
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });

      }else{
        
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
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
      }
      
    }
  }
  close() {
    this.ref.close();
  }
}
