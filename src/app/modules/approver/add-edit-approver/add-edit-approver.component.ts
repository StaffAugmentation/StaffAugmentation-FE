import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ApproverService } from '@services/approver.service';
import { Approver } from '@models/approver';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-approver',
  templateUrl: './add-edit-approver.component.html',
  styleUrls: ['./add-edit-approver.component.scss'],
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
  selectedValue!: Approver;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private approverService: ApproverService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data.idApprover;
    if(this.id){
      this.approverService.getOne(this.id).subscribe({
        next: res=>{
          this.selectedValue = res;
          this.addEditForm = new FormGroup({
            appFirstName: new FormControl(res.appFirstName, [Validators.required]),
            appLastName: new FormControl(res.appLastName, [Validators.required]),
          });
        },
        error: err => {

        }
      })
    }
    else{
      this.addEditForm = new FormGroup({
        appFirstName: new FormControl(null, [Validators.required]),
        appLastName: new FormControl(null, [Validators.required]),
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      if(this.id){
        this.approverService.updateApprover(new Approver(
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
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });

      }else{
        
        this.approverService.addApprover(new Approver(
          this.id || 0,
          this.addEditForm.value.appFirstName,
          this.addEditForm.value.appLastName)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Approver added successfuly" });
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