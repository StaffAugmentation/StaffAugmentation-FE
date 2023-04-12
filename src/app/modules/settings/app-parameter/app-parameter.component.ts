import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { AppParameterService } from '@services/app-parameter.service';
import { AppParameter } from '@models/app-parameter';
import { EditRecruitmentConsultantComponent } from './edit-recruitment-consultant/edit-recruitment-consultant.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService , DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-app-parameter',
  templateUrl: './app-parameter.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ]
})
export class AppParameterComponent implements OnInit {

  editForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  appParameter!: AppParameter;
  id : number = 1;
  constructor(private appParameterService: AppParameterService, private toast: MessageService, private modalService: DialogService,
    private modalEdit: DynamicDialogRef, private confirmationService:ConfirmationService) {}

  ngOnInit(): void {
    this.getAppParameters();
  }
  
  getAppParameters(): void {
    this.appParameterService.getOne(this.id).subscribe({
      next: res => {
        this.initForm(res);
        this.appParameter=res;
      },
      error: err => {
        let errMessage: string = err.error;
        if (err.status != 400) {
          errMessage = 'Something went wrong with the server !';
        }
        this.toast.add({ severity: 'error', summary: errMessage });
      }
    });
  }

  edit(action: string): void {
    if (action == 'recruitment') {
      this.modalEdit = this.modalService.open(EditRecruitmentConsultantComponent, {
        header: `Edit HR contact`,
        style: { width: '70%', maxWidth: '500px' },
        data: {
          appParameter: this.appParameter,
          type: 'hr',
        }
      });
      this.modalEdit.onClose.subscribe(() => {
        this.getAppParameters();
      });
    }
    else if (action == 'consultant') {
      this.modalEdit = this.modalService.open(EditRecruitmentConsultantComponent, {
        header: `Edit consultant contact`,
        style: { width: '70%', maxWidth: '500px' },
        data: {
          appParameter: this.appParameter,
          type: 'consultant', 
        }
      });
      this.modalEdit.onClose.subscribe(() => {
        this.getAppParameters();
      });
    }
  }
  
  onSubmit() {
    this.isSubmited = true;
      if (this.editForm.valid) {
        this.actionLoading = true;
        if (this.appParameter.id) {
          this.appParameter.daysBeforeDeletingFile=this.editForm.value.daysBeforeDeletingFile;
          this.appParameter.brAdvancedSearchDate=this.editForm.value.brAdvancedSearchDate;
          this.appParameter.scAdvancedSearchPeriod=this.editForm.value.scAdvancedSearchPeriod;
          this.appParameter.contractApprover=this.editForm.value.contractApprover;
          this.appParameter.contractApproverEmail=this.editForm.value.contractApproverEmail;
          this.appParameter.saEmail=this.editForm.value.saEmail;
          this.appParameter.qtmDailyPriceIsActive=this.editForm.value.qtmDailyPriceIsActive;
          this.appParameter.tmDailyPriceIsActive=this.editForm.value.tmDailyPriceIsActive;
          this.appParameter.useLDAPService=this.editForm.value.useLDAPService;
          this.appParameterService.updateAppParameter(this.appParameter)
            .subscribe({
            next: res => {
              this.actionLoading = false;
              this.confirmationService.confirm({
                message: 'Contact parameters are saved',
                header: 'Saved!',
                icon: 'pi pi-check-circle text-green-500',
                acceptButtonStyleClass: 'p-button-center',
                acceptIcon: '',
                acceptLabel: 'Ok',
                rejectVisible: false,
                
              })
              this.getAppParameters();
            },
            error: (err: any) => {
              let errMessage: string = err.error;
              if (err.status != 400) {
                errMessage = 'Something went wrong with the server !';
              }
              this.actionLoading = false;
              this.toast.add({ severity: 'error', summary: errMessage });
            }
          });
  
        }
      }
  }
  initForm(data: AppParameter | null): void {
    this.editForm = new FormGroup({
      daysBeforeDeletingFile: new FormControl(data ? data.daysBeforeDeletingFile : null),
      brAdvancedSearchDate: new FormControl(data ? data.brAdvancedSearchDate : null),
      scAdvancedSearchPeriod: new FormControl(data ? data.scAdvancedSearchPeriod : null),
      contractApprover: new FormControl(data ? data.contractApprover : null),
      contractApproverEmail: new FormControl(data ? data.contractApproverEmail : null, [Validators.email]),
      saEmail: new FormControl(data ? data.saEmail : null),
      qtmDailyPriceIsActive: new FormControl(data ? data.qtmDailyPriceIsActive : true),
      tmDailyPriceIsActive: new FormControl(data ? data.tmDailyPriceIsActive : true),
      useLDAPService: new FormControl(data ? data.useLDAPService : false),
    });
  }
  getErrorMessage(field: string, error: any): string {
    if (error?.email)
      return `${field} format not valid`;
    return '';
  }
}
