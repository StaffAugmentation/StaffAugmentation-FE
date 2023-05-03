import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { Department } from '@models/department';
import { DepartmentService } from '@services/department.service';


@Component({
  standalone:true,
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
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
export class AddDepartmentComponent implements OnInit {

  id!: number;
  addForm!: FormGroup;
  isSubmited: boolean = false;
  departments: Department[] = [];

  constructor(private ref: DynamicDialogRef, private toast: MessageService,private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      valueId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(true),
    });
  }
  getDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (res) => {
        this.departments = res;
        this.departments = this.departments.map((dep: any) => {
          return { ...dep, displayLabel: dep.value };
        });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.addForm.valid) {
        this.departmentService.addDepartment(new Department(
          this.id || 0,
          this.addForm.value.valueId,
          this.addForm.value.isActive || true )
        ).subscribe({
          next: (res) => {
            this.toast.add({ severity: 'success', summary: "Department added successfuly" });
            this.ref.close(res);
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
    }

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
