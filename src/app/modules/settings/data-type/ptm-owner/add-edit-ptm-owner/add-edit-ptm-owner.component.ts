import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { PTMOwnerService } from '@services/ptm-owner.service';
import { PTMOwner } from '@models/ptmOwner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { Approvers } from '@models/approvers';
import { ApproverService } from '@services/approver.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-add-edit-PTMOwner',
  templateUrl: './add-edit-ptm-owner.component.html',
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
export class AddEditPTMOwnerComponent implements OnInit {

  id!: number;
  selectedValue!: PTMOwner;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  approvers: Approvers[] = [];
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private PTMOwnerService: PTMOwnerService, private toast: MessageService, public config: DynamicDialogConfig, private approverService: ApproverService) {
    this.getApprovers();
  }

  ngOnInit(): void {
    this.id = this.config.data?.id;
    if (this.id) {
      this.PTMOwnerService.getOne(this.id).subscribe({
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
          return { ...appr, displayLabel: appr.firstName + ' ' + appr.lastName }; });
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
        this.PTMOwnerService.updatePTMOwner(new PTMOwner(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.bA,
          this.addEditForm.value.bicsw,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.isEveris,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.approver)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "PTM Owner updated successfuly" });
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
        this.PTMOwnerService.addPTMOwner(new PTMOwner(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.bA,
          this.addEditForm.value.bicsw,
          this.addEditForm.value.vatRate,
          this.addEditForm.value.isEveris,
          this.addEditForm.value.vatNumber,
          this.addEditForm.value.approver)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "PTM Owner added successfuly" });
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

  initForm(data: PTMOwner | null): void {
    this.addEditForm = new FormGroup({
      valueId: new FormControl(data ? data.valueId : '', [Validators.required]),
      ba: new FormControl(data ? data.ba : null),
      vatNumber: new FormControl(data ? data.vatNumber : null),
      bICSW: new FormControl(data ? data.bicsw : null),
      approver: new FormControl(data ? data.approver : null),
      vatRate: new FormControl(data ? data.vatRate : null),
      isEveris: new FormControl(data ? data.isEveris : false),
    });
  }

  close() {
    this.ref.close();
  }
}
