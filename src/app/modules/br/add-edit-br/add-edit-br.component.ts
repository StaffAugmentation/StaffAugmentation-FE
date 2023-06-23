import { Component, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormControl, Validators,  FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { Department } from '@models/department';
import { DepartmentService } from '@services/department.service';
import { BrSource } from '@models/br-source';
import { BrType } from '@models/br-type';
import { PlaceOfDelivery } from '@models/place-of-delivery';
import { Type } from '@models/type';
import { StatusBR } from '@models/status-br';
import { TypeService } from '@services/type.service';
import { StatusBRService } from '@services/status-br.service';
import { BrTypeService } from '@services/br-type.service';
import { BrSourceService } from '@services/br-source.service';
import { PlaceOfDeliveryService } from '@services/place-of-delivery.service';


import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddEditBrProfileComponent } from './add-edit-br-profile/add-edit-br-profile.component';
import { EditConsultantComponent } from './edit-consultant/edit-consultant.component';
import { AddEditCandidateComponent } from './add-edit-candidate/add-edit-candidate.component';
import { EditPenaltyComponent } from './edit-penalty/edit-penalty.component';
import { TabView } from 'primeng/tabview';



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
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule
  ]
})
export class AddEditBrComponent implements OnInit {
@ViewChild('tabView', { static: false }) tabView!: TabView;
activeTabIndex = 0;
  filteredDepartments: Department[] = [];
  departments: Department[] = [];
  source: BrSource[] = [];
  status: StatusBR[] = [];
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  frameworkContract!: [];
  cascade!: [];
  docType!: any[];
  serviceType: BrType[] = [];
  subscription!: Subscription;
  id: any;
  selectedDepartment: any;
  openIntended: Type[] = [];
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
  placeOfDelivery: PlaceOfDelivery[] = [];
  listBrProfile!: any[];
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
  listPenalty!: any[];
  tableOptionsPenalty: any = {
    visibleCols: [],
    cols: [
      { id: 'profileN', label: 'Profile Nº' },
      { id: 'plcOnsite', label: 'Profile/level/category/onsite' },
      { id: 'consultantName', label: 'Consultant name' },
      { id: 'penaltyDays', label: 'Penalty days' },
      { id: 'penalty', label: 'Penalty' },
      { id: 'penaltyComment', label: 'Penalty comment' },
    ],
    loading: false,
    exportLoading: false
  };
  uploadedFiles: any[] = []
  listFile!: any[];
  tableOptionsFile: any = {
    visibleCols: [],
    cols: [
      { id: 'fileName', label: 'File name' },
      { id: 'appName', label: 'App name' },
      { id: 'docType', label: 'Document type' }
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
    private modalEditPenalty: DynamicDialogRef,
    private ref: DynamicDialogRef,
    public toast: MessageService,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService,
    private modalService: DialogService,
    private typeService: TypeService,
    private statusBRService: StatusBRService,
    private brTypeService: BrTypeService,
    private brSourceService: BrSourceService,
    private placeOfDeliveryService: PlaceOfDeliveryService,

    ) {
      this.getStatus();
      this.getBrType();
      this.getBrSource();
      this.getPlaceOfDelivery();

    }
  ngOnInit(): void {
    this.initForm(null);

    this.tableOptionsProfile.visibleCols = this.tableOptionsProfile.cols;
    this.tableOptionsBrProfile.visibleCols = this.tableOptionsBrProfile.cols;
    this.tableOptionsConsultant.visibleCols = this.tableOptionsConsultant.cols;
    this.tableOptionsCandidate.visibleCols = this.tableOptionsCandidate.cols;
    this.tableOptionsPartner.visibleCols = this.tableOptionsPartner.cols;
    this.tableOptionsPenalty.visibleCols = this.tableOptionsPenalty.cols;
    this.tableOptionsFile.visibleCols = this.tableOptionsFile.cols;
    this.getProfile();
    this.getBrProfile();
    this.getConsultant();
    this.getCandidate();
    this.getPartner();
    this.getPenalty();
    this.getFile();
    this.getTypes();
    this.getStatus();
    this.getBrType();
    this.getBrSource();
    this.getPlaceOfDelivery();

    this.getDepartments();

  }
  nextTab() {
    this.activeTabIndex = (this.activeTabIndex + 1) % this.tabView.tabs.length;
  }
  prevTab() {
    this.activeTabIndex = (this.activeTabIndex - 1 + this.tabView.tabs.length) % this.tabView.tabs.length;
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

  getProfile(): void {
    this.listProfile = [
      { profileN: 21002, plcOnsite: 'AA;Junio;On site', consultantName: '', requestFS: 'Acknowledged receipt' }
    ];
  };
  getBrProfile(): void {
    this.listBrProfile = [
      { profileN: 20208, profile: 'AA', level: 2, category: 3, onFarSite: 'On site', nDays: 60.00000, salesPrice: '504.09 €', subtotal: '30.24540 €' }
    ];
  };
  getConsultant(): void {
    this.listConsultant = [
      { id: 1, name: 'Narasimharaju Medara', employeeNumber: '' }
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
  getPenalty(): void {
    this.listPenalty = [
      { profileN: 20207, plcOnsite: 'TE;3;3;On site', consultantName: 'Alexandru Tasca', penaltyDays: '', penalty: '', penaltyComment: '' }
    ];
  };
  getFile(): void {
    this.listFile = [
      { fileName: "L1.10612 - 023521 - FO.pdf", appName: "DIGITTM-027521-MOD-01-600017889-R", docType: "Formal Offer" },
      { fileName: "L1.10612 - DIGITT-027521-DIGITTM-027186-MO", appName: "DIGITTM-027521-MOD-01-600017889-R", docType: "Client Contract/PO Draft" },
      { fileName: "L1.10612 - DIGITT-027521-DIGITTM-027186-MO", appName: "DIGITTM-027521-MOD-01-600017889-R", docType: "Client Contract/PO Draft" },
      { fileName: "L1.10612 - 023521 - FO.pdf", appName: "DIGITTM-027521-MOD-01-600017889-R", docType: "Formal Offer" },
    ];
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
      if (department.valueId.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(department);
      }
    }

    this.filteredDepartments = filtered;
  }
  getTypes(): void {
    this.typeService.getAll().subscribe({
      next: (res) => {
        this.openIntended = res;
        this.openIntended = this.openIntended.map((openIntended: any) => {
          return { ...openIntended, displayLabel: openIntended.valueId}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  getStatus(): void {
    this.statusBRService.getAll().subscribe({
      next: (res) => {
        this.status = res;
        this.status = this.status.map((status: any) => {
          return { ...status, displayLabel: status.valueId}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  getBrType(): void {
    this.brTypeService.getAll().subscribe({
      next: (res) => {
        this.serviceType = res;
        this.serviceType = this.serviceType.map((serviceType: any) => {
          return { ...serviceType, displayLabel: serviceType.valueId}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  getBrSource(): void {
    this.brSourceService.getAll().subscribe({
      next: (res) => {
        this.source = res;
        this.source = this.source.map((source: any) => {
          return { ...source, displayLabel: source.name}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  getPlaceOfDelivery(): void {
    this.placeOfDeliveryService.getAll().subscribe({
      next: (res) => {
        this.placeOfDelivery = res;
        this.placeOfDelivery = this.placeOfDelivery.map((placeOfDelivery: any) => {
          return { ...placeOfDelivery, displayLabel: placeOfDelivery.valueId}; });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
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
      subtotalPrice: new FormControl({ value: null, disabled: true }),
      generalBudget: new FormControl({ value: null, disabled: true }),
      totalPrice: new FormControl({ value: null, disabled: true }),
      specificCN: new FormControl(null, [Validators.required]),
      dateSCR: new FormControl(null, [Validators.required]),
      dateSCS: new FormControl(null, [Validators.required]),
      projectSD: new FormControl(null),
      maximumED: new FormControl(null, [Validators.required]),
      extensionMED: new FormControl(null),
      numberOfDays: new FormControl(null, [Validators.required]),
      additionalBudget: new FormControl(null),
      specificClientC: new FormControl(null),
      generalComment: new FormControl(null),
      searchTable: new FormControl(null),
    });
  }

  addDepartment(): void {
    this.modalDepartment = this.modalService.open(AddDepartmentComponent, {
      header: `Add department`,
      style: { width: '90%', maxWidth: '500px' },
      maskStyleClass: 'centred-header',
      data: {
        name: 'Department'
      }
    });
    this.modalDepartment.onClose.subscribe(res => {
      if (res) {
        this.getDepartments();
        this.addEditForm.get('department')!.setValue(res);
      }
    });
  }

  editProfile(id: number): void {
    if (id) {
      this.modalEditProfile = this.modalService.open(EditProfileComponent, {
        header: `Edit profile`,
        style: { width: '95%', maxWidth: '1000px' },
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalEditProfile.onClose.subscribe(res => {
        this.getProfile();
      });
    }
  }

  addEditBrProfile(action: string, id: number): void {
    if (action == 'add') {
      this.modalAddEditBrProfile = this.modalService.open(AddEditBrProfileComponent, {
        header: `Add profile`,
        maskStyleClass: 'centred-header',
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
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalAddEditBrProfile.onClose.subscribe(res => {
        this.getBrProfile();
      });
    }
  }

  deleteBrProfile(id: number): void {
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

  editConsultant(id: number, name: string): void {
    if (id) {
      this.modalEditConsultant = this.modalService.open(EditConsultantComponent, {
        header: name,
        style: { width: '95%', maxWidth: '1000px' },
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalEditConsultant.onClose.subscribe(res => {
        this.getConsultant();
      });
    }
  }

  deleteConsultant(id: number): void {
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
  addEditCandidate(action: string, id: number): void {
    if (action == 'add') {
      this.modalAddEditCandidate = this.modalService.open(AddEditCandidateComponent, {
        header: `Add candidate`,
        maskStyleClass: 'centred-header',
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
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalAddEditCandidate.onClose.subscribe(res => {
        this.getCandidate();
      });
    }
  }

  deleteCandidate(id: number): void {
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
  addEditPartner(action: string, id: number): void {
    if (action == 'add') {
      this.modalAddEditPartner = this.modalService.open(AddEditCandidateComponent, {
        header: `Add Partner`,
        maskStyleClass: 'centred-header',
        style: { width: '95%', maxWidth: '1000px' }
      });
      this.modalAddEditPartner.onClose.subscribe(res => {
        this.getPartner();
      });
    }
    else if (id) {
      this.modalAddEditPartner = this.modalService.open(AddEditCandidateComponent, {
        header: `Edit Partner`,
        style: { width: '95%', maxWidth: '1000px' },
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalAddEditPartner.onClose.subscribe(res => {
        this.getPartner();
      });
    }
  }

  deletePartner(id: number): void {
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
  editPenalty(id: number): void {
    if (id) {
      this.modalEditPenalty = this.modalService.open(EditPenaltyComponent, {
        header: `Edit penalty`,
        style: { width: '95%', maxWidth: '800px' },
        maskStyleClass: 'centred-header',
        data: {
          id: id
        }
      });
      this.modalEditPenalty.onClose.subscribe(res => {
        this.getPenalty();
      });
    }
  }
  deleteFile(id: number): void {
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
