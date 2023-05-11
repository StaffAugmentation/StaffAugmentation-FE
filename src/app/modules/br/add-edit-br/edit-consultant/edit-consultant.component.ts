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
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddEditProfileComponent } from './add-edit-profile/add-edit-profile.component';

@Component({
  standalone: true,
  selector: 'app-edit-consultant',
  templateUrl: './edit-consultant.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    ToastModule,
    TableModule,
  ]
})
export class EditConsultantComponent implements OnInit {
  editForm!: FormGroup;
  actionLoading: boolean = false;
  listProfile!: any[];
  tableOptionsProfile: any = {
    visibleCols: [],
    cols: [
      { id: 'plcOnsite', label: 'Profile/level/category/onsite' },
      { id: 'salesPrice', label: 'Sales price' },
      { id: 'nOfDays', label: 'Nº of days' },
      { id: 'consultantCost', label: 'Consultant cost' },
      { id: 'margin', label: 'Margin' },
      { id: 'typeOfContract', label: 'Type of contract' },
      { id: 'subcontractor', label: 'Subcontractor' },
    ],
    loading: false,
    exportLoading: false
  };
  isSubmited!: boolean;

  constructor(
    private modalDepartment: DynamicDialogRef,
    private modalEditProfile: DynamicDialogRef,
    private modalAddEditProfile: DynamicDialogRef,
    private modalEditConsultant: DynamicDialogRef,
    private ref: DynamicDialogRef,
    public toast: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: DialogService) { }
  ngOnInit(): void {
    this.initForm(null);
    this.tableOptionsProfile.visibleCols = this.tableOptionsProfile.cols;
    this.getProfile();
  }

  getProfile(): void {
    this.listProfile = [
      { id:1, plcOnsite: "20208 AA;2;3;On site", salesPrice: '504.09 €', nOfDays: 60.00000, consultantCost: '430.00 €', margin: '14.70', typeOfContract: 'Freelance', subcontractor: '' }
    ];
  };
  onSubmit() {
    this.isSubmited = true;
    this.ref.close();
  }
  initForm(data: null): void {
    this.editForm = new FormGroup({
      ressourcePhone: new FormControl({value: null, disabled: true}),
      ressourceEmail: new FormControl({value: null, disabled: true}),
      vatNumber: new FormControl({value: null, disabled: true}),
      nationality: new FormControl({value: null, disabled: true}),
      legalEN: new FormControl({value: null, disabled: true}),
      idNumber: new FormControl({value: null, disabled: true}),
      legalEA: new FormControl({value: null, disabled: true}),
      employeeNumber: new FormControl({value: null, disabled: true}),
    });
  }
  addEditProfile(action: string, id:number): void {
    if (action == 'add') {
      this.modalAddEditProfile = this.modalService.open(AddEditProfileComponent, {
        header: `Assign profile`,
        maskStyleClass: 'centred-header',
        style: { width: '95%', maxWidth: '900px' }
      });
      this.modalAddEditProfile.onClose.subscribe(res => {
        this.getProfile();
      });
    }
    else if (id) {
      this.modalAddEditProfile = this.modalService.open(AddEditProfileComponent, {
        header: `Edit profile`,
        style: { width: '95%', maxWidth: '900px' },
        maskStyleClass: 'centred-header',
        data: {
          id:id
        }
      });
      this.modalAddEditProfile.onClose.subscribe(res => {
        this.getProfile();
      });
    }
  }
  deleteProfile(id:number): void {
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

  close() {
    this.ref.close();
  }
}
