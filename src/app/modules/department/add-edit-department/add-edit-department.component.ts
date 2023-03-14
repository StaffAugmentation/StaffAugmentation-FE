import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { DepartmentService } from '@services/department.service';
import { Department } from '@models/department';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module'

@Component({
  standalone: true,
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.scss'],
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
export class AddEditDepartmentComponent implements OnInit {

  id!: number;
  selectedValue!: Department;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private departmentService: DepartmentService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if(this.id){
      this.departmentService.getOne(this.id).subscribe({
        next: res=>{
          this.selectedValue = res;
          this.addEditForm = new FormGroup({
            valueId: new FormControl(res.valueId, [Validators.required]),
            isActive: new FormControl(res.isActive),
          });
        },
        error: err => {

        }
      })
    }
    else{
      this.addEditForm = new FormGroup({
        valueId: new FormControl(null, [Validators.required]),
        isActive: new FormControl(false),
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    console.log(this.addEditForm.value);
    if (this.addEditForm.valid) {
      if(this.id){
        this.departmentService.updateDepartment(new Department(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Department updated successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
      }else{
        this.departmentService.addDepartment(new Department(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Department added successfuly" });
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


