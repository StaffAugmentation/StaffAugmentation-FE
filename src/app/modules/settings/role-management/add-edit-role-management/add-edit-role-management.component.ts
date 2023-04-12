import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-edit-role-management',
  templateUrl: './add-edit-role-management.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    RadioButtonModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class AddEditRoleManagementComponent implements OnInit {

  role: any;
  addEditForm!: FormGroup;
  isSubmited :boolean= false;
  types = [
    { name: 'Administrator' },
    { name: 'Consultation' },
    { name: 'Finance' },
    { name: 'User' },
    { name: 'UserRecruitment' }
  ];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.role = this.config.data?.role;
    this.initForm();
  }

  onSubmit(): void {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.close();
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      roleName: [this.role?.roleName, Validators.required],
      roleType: [this.role?.roleType, Validators.required]
    });
  }
  
  close(): void {
    this.ref.close();
  }

}
