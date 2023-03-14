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
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
  constructor(private ref: DynamicDialogRef, private departmentService: DepartmentService, private toast: MessageService) { }

  ngOnInit(): void {
    this.addEditForm = new FormGroup({
      Id: new FormControl(null  ),
      ValueId: new FormControl(null),
      isActive: new FormControl(false),
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.departmentService.addDepartment(new Department(
        this.id || 0,
        this.addEditForm.value.Id,
        this.addEditForm.value.Value,)
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
  close() {
    this.ref.close();
  }
}
