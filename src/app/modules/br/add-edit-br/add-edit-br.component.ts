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
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddEditBrProfileComponent } from './add-edit-br-profile/add-edit-br-profile.component';
import { EditConsultantComponent } from './edit-consultant/edit-consultant.component';
import { AddEditCandidateComponent } from './add-edit-candidate/add-edit-candidate.component';
import { AddEditPartnerComponent } from './add-edit-partner/add-edit-partner.component';


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
    AutoCompleteModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule
  ]
})
export class AddEditBrComponent implements OnInit {

  filteredDepartments!: any[];
  departments: any;
  source!: any[];
  status!: any[];
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
  listProfile!: any[];
  tableOptionsProfile: any = {
    visibleCols: [],
    cols: [
      { id: 'profileN', label: 'Profile Nº' },
      { id: 'plcOnsite', label: 'Profile/level/category/onsite' },
      { id: 'consultantName', label: 'Consultant name' },
      { id: 'requestFS', label: 'Request form status' },
    ],
    loading: false,
    exportLoading: false
  };
  placeOfDelivery!: any[];
  listBrProfile!: any[];
  searchTable: string = '';
  tableOptionsBrProfile: any = {
    visibleCols: [],
    cols: [
      { id: 'profileN', label: 'Profile Nº' },
      { id: 'profile', label: 'Profile' },
      { id: 'level', label: 'Level' },
      { id: 'category', label: 'Category' },
      { id: 'onFarSite', label: 'On/Far Site' },
      { id: 'nDays', label: 'Nº Days' },
      { id: 'salesPrice', label: 'Sales Price' },
      { id: 'subtotal', label: 'Subtotal' },
    ],
    loading: false,
    exportLoading: false
  };
  listConsultant!: any[];
  tableOptionsConsultant: any = {
    visibleCols: [],
    cols: [
      { id: 'name', label: 'Consultant Name' },
      { id: 'employeeNumber', label: 'Employee number' },
    ],
    loading: false,
    exportLoading: false
  };
  listCandidate!: any[];
  tableOptionsCandidate: any = {
    visibleCols: [],
    cols: [
      { id: 'code', label: 'Code' },
      { id: 'firstName', label: 'First name' },
      { id: 'lastName', label: 'Last name' },
      { id: 'company', label: 'Company' },
      { id: 'recruitmentResp', label: 'Recruitment resp' },
      { id: 'ressourceType', label: 'Ressource type' },
    ],
    loading: false,
    exportLoading: false
  };
  listPartner!: any[];
  tableOptionsPartner: any = {
    visibleCols: [],
    cols: [
      { id: 'code', label: 'Code' },
      { id: 'firstName', label: 'First name' },
      { id: 'lastName', label: 'Last name' },
      { id: 'company', label: 'Company' },
      { id: 'recruitmentResp', label: 'Recruitment resp' },
      { id: 'ressourceType', label: 'Ressource type' },
    ],
    loading: false,
    exportLoading: false
  };

  constructor(
    private modalDepartment: DynamicDialogRef,
    private modalEditProfile: DynamicDialogRef,
    private modalAddEditBrProfile: DynamicDialogRef,
    private modalEditConsultant: DynamicDialogRef,
    private modalAddEditCandidate: DynamicDialogRef,
    private modalAddEditPartner: DynamicDialogRef,
    private ref: DynamicDialogRef,
    public toast: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: DialogService) { }

  ngOnInit(): void {
    this.initForm(null);

    this.tableOptionsProfile.visibleCols = this.tableOptionsProfile.cols;
    this.tableOptionsBrProfile.visibleCols = this.tableOptionsBrProfile.cols;
    this.tableOptionsConsultant.visibleCols = this.tableOptionsConsultant.cols;
    this.tableOptionsCandidate.visibleCols = this.tableOptionsCandidate.cols;
    this.tableOptionsPartner.visibleCols = this.tableOptionsPartner.cols;
    this.getProfile();
    this.getBrProfile();
    this.getConsultant();
    this.getCandidate();
    this.getPartner();

  }
  getProfile(): void {
    this.listProfile = [
      { profileN: 21002, plcOnsite: 'AA;Junio;On site', consultantName: '', requestFS: 'Acknowledged receipt' }
    ];
  };
  getBrProfile(): void {
    this.listBrProfile = [
      { profileN: 20208, profile: 'AA', level: 2, category: 3, onFarSite: 'On site',  nDays: 60.00000, salesPrice: '504.09 €', subtotal:'30.24540 €' }
    ];
  };
  getConsultant(): void {
    this.listConsultant = [
      { id: 1, name: 'Narasimharaju Medara', employeeNumber:'' }
    ];
  };
  getCandidate(): void {
    this.listCandidate = [
      { code: 4083, firstName: 'Narasimharaju', lastName: 'Medara', company: '', recruitmentResp: '', ressourceType: 'Recruitment' }
    ];
  };
  getPartner(): void {
    this.listPartner = [];
  };

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
      dateRf: new FormControl(null, [Validators.required]),
      acknowlegment: new FormControl(null),
      acknowlegmentDl: new FormControl(null),
      yesNoDeadline: new FormControl(null, [Validators.required]),
      proposalDeadline: new FormControl(null, [Validators.required]),
      expectedSD: new FormControl(null),
      placeOfDelivery: new FormControl(null, [Validators.required]),
      totalManDays: new FormControl(null),
    });
  }

  addDepartment(): void {
    this.modalDepartment = this.modalService.open(AddDepartmentComponent, {
      header: `Add department`,
      style: { width: '90%', maxWidth: '500px' }
    });
    this.modalDepartment.onClose.subscribe(res => {

    });
  }

  editProfile(id: number): void {
    if (id) {
      this.modalEditProfile = this.modalService.open(EditProfileComponent, {
        header: `Edit profile`,
        style: { width: '95%', maxWidth: '1000px' },
        data: {
          id: id
        }
      });
      this.modalEditProfile.onClose.subscribe(res => {
        this.getProfile();
      });
    }
  }

  addEditBrProfile(action: string, id:number): void {
    if (action == 'add') {
      this.modalAddEditBrProfile = this.modalService.open(AddEditBrProfileComponent, {
        header: `Add profile`,
        style: { width: '95%', maxWidth: '1000px' }
      });
      this.modalAddEditBrProfile.onClose.subscribe(res => {
        this.getBrProfile();
      });
    }
    else if (id) {
      this.modalAddEditBrProfile = this.modalService.open(AddEditBrProfileComponent, {
        header: `Edit profile`,
        style: { width: '95%', maxWidth: '1000px' },
        data: {
          id:id
        }
      });
      this.modalAddEditBrProfile.onClose.subscribe(res => {
        this.getBrProfile();
      });
    }
  }

  deleteBrProfile(id:number): void {
    this.confirmationService.confirm({
      message: 'You won\'t be able to revert this! ',
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-circle text-yellow-500',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-secondary p-button-raised',
      acceptLabel: 'Yes, delete it',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
    });
  }

  editConsultant(id: number,name: string): void {
    if (id) {
      this.modalEditConsultant = this.modalService.open(EditConsultantComponent, {
        header: name,
        style: { width: '95%', maxWidth: '1000px' },
        data: {
          id: id
        }
      });
      this.modalEditConsultant.onClose.subscribe(res => {
        this.getConsultant();
      });
    }
  }

  deleteConsultant(id:number): void {
    this.confirmationService.confirm({
      message: 'You won\'t be able to revert this! ',
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-circle text-yellow-500',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-secondary p-button-raised',
      acceptLabel: 'Yes, delete it',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
    });
  }
  addEditCandidate(action: string, id:number): void {
    if (action == 'add') {
      this.modalAddEditCandidate = this.modalService.open(AddEditCandidateComponent, {
        header: `Add candidate`,
        style: { width: '95%', maxWidth: '1000px' }
      });
      this.modalAddEditCandidate.onClose.subscribe(res => {
        this.getCandidate();
      });
    }
    else if (id) {
      this.modalAddEditCandidate = this.modalService.open(AddEditCandidateComponent, {
        header: `Edit candidate`,
        style: { width: '95%', maxWidth: '1000px' },
        data: {
          id:id
        }
      });
      this.modalAddEditCandidate.onClose.subscribe(res => {
        this.getCandidate();
      });
    }
  }

  deleteCandidate(id:number): void {
    this.confirmationService.confirm({
      message: 'You won\'t be able to revert this! ',
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-circle text-yellow-500',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-secondary p-button-raised',
      acceptLabel: 'Yes, delete it',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
    });
  }
  addEditPartner(action: string, id:number): void {
    if (action == 'add') {
      this.modalAddEditPartner = this.modalService.open(AddEditPartnerComponent, {
        header: `Add Partner`,
        style: { width: '95%', maxWidth: '1000px' }
      });
      this.modalAddEditPartner.onClose.subscribe(res => {
        this.getPartner();
      });
    }
    else if (id) {
      this.modalAddEditPartner = this.modalService.open(AddEditPartnerComponent, {
        header: `Edit Partner`,
        style: { width: '95%', maxWidth: '1000px' },
        data: {
          id:id
        }
      });
      this.modalAddEditPartner.onClose.subscribe(res => {
        this.getPartner();
      });
    }
  }

  deletePartner(id:number): void {
    this.confirmationService.confirm({
      message: 'You won\'t be able to revert this! ',
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-circle text-yellow-500',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-secondary p-button-raised',
      acceptLabel: 'Yes, delete it',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
    });
  }
  getErrorMessage(field: string, error: any): string {
    if (error?.required)
      return `${field} is required`;
    return '';
  }

  onGlobalFilter(table: Table): void {
    table.filterGlobal(this.tableOptionsProfile, 'contains');
  }

  close() {
    this.ref.close();
  }
}
