import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  standalone: true,
  selector: 'app-add-edit-br',
  templateUrl: './add-edit-br.component.html',
  styleUrls: ['./add-edit-br.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    ReactiveFormsModule,
    SharedModule,
    TabViewModule,
    DropdownModule,
    ToastModule,
    CardModule,
    MenubarModule,
    MenuModule,
    StepsModule,
    AutoCompleteModule
  ]
})
export class AddEditBrComponent implements OnInit {
  filteredDepartments!: any[];
  departments: any;
  source!: any[];
  status!: any[];
  items!: MenuItem[];
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  frameworkContract!: [];
  cascade!: [];
  serviceType!: [];
  subscription!: Subscription;
  id: any;
  selectedDepartment: any;
  openIntended!: any[];
  constructor(private modalAdd: DynamicDialogRef, private ref: DynamicDialogRef, public toast: MessageService, private modalService: DialogService) { }

  ngOnInit(): void {
    this.initForm(null);
    this.items = [
      {
        label: 'General information',
      },
      {
        label: 'Work order',
      },
      {
        label: 'Basic characteristics',
      },
      {
        label: 'Offer information',
      },
      {
        label: 'Specific contract',
      },
      {
        label: 'Documentation',
      }
    ];
  }
  onSubmit() {
    this.isSubmited = true;
    this.ref.close();
  }
  filterDepartment(event: { query: any; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.departments.length; i++) {
      let department = this.departments[i];
      if (department.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(department);
      }
    }

    this.filteredDepartments = filtered;
  }
  initForm(data: null): void {
    this.addEditForm = new FormGroup({
      requestNumber: new FormControl(null, [Validators.required]),
      frameworkContract: new FormControl(null, [Validators.required]),
      cascade: new FormControl(null),
      department: new FormControl(null, [Validators.required]),
      departmentEmail: new FormControl(null),
      contactName: new FormControl(null),
      technicalContact: new FormControl(null),
      openIntended: new FormControl(null),
      comment: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      serviceType: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.required]),
    });
  }

  add(): void {
      this.modalAdd = this.modalService.open(AddDepartmentComponent, {
        header: `Add department`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAdd.onClose;
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

