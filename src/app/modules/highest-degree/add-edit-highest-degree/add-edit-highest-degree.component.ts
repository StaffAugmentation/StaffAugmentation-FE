import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { HighestDegreeService } from '@services/highest-degree.service';
import { HighestDegree } from '@models/highest-degree';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module'

@Component({
  standalone: true,
  selector: 'app-add-edit-highest-degree',
  templateUrl: './add-edit-highest-degree.component.html',
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
export class AddEditHighestDegreeComponent implements OnInit {

  id!: number;
  selectedValue!: HighestDegree;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private HighestDegreeService: HighestDegreeService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.id;
    if(this.id){
      this.HighestDegreeService.getOne(this.id).subscribe({
        next: res=>{
          this.selectedValue = res;
          this.addEditForm = new FormGroup({
            value: new FormControl(res.value, [Validators.required]),
            isActive: new FormControl(res.isActive),
          });
        },
        error: err => {

        }
      })
    }
    else{
      this.addEditForm = new FormGroup({
        value: new FormControl(null, [Validators.required]),
        isActive: new FormControl(true),
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    console.log(this.addEditForm.value);
    if (this.addEditForm.valid) {
      if(this.id){
        this.HighestDegreeService.updateHighestDegree(new HighestDegree(
          this.id,
          this.addEditForm.value.value,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Highest Degree updated successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
      }else{
        this.HighestDegreeService.addHighestDegree(new HighestDegree(
          this.id || 0,
          this.addEditForm.value.value,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Highest Degree added successfuly" });
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


