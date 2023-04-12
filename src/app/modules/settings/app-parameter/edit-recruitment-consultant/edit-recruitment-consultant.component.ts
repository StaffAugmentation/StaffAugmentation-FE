import { Component, OnInit} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppParameterService } from '@services/app-parameter.service';
import { AppParameter } from '@models/app-parameter';
import { FormGroup, FormControl} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-edit-recruitment-consultant',
  templateUrl: './edit-recruitment-consultant.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmDialogModule
  ]
})
export class EditRecruitmentConsultantComponent implements OnInit {

  editForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  type!: string;
  appParameter!: AppParameter;

  constructor(private ref: DynamicDialogRef, private appParameterService: AppParameterService, private toast: MessageService, 
    public config: DynamicDialogConfig , private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.appParameter = this.config.data?.appParameter;
    this.type = this.config.data?.type;
    this.initForm(this.appParameter);
  }

  onSubmit() {
    console.log(this.appParameter.daysBeforeDeletingFile)
    this.isSubmited = true;
      if (this.editForm.valid) {
        this.actionLoading = true;
        if (this.type == 'hr') {
          this.appParameter.hrEmailSubject = this.editForm.value.subject;
          this.appParameter.hrEmailText = this.editForm.value.text;
        }else{
          this.appParameter.consultantEmailSubject = this.editForm.value.subject;
          this.appParameter.consultantEmailText = this.editForm.value.text;
        }  
          this.appParameterService.updateAppParameter(this.appParameter).subscribe({
            next: () => {
              this.actionLoading = false;
              this.ref.close();
              this.confirmationService.confirm({
                message: 'Contact parameters are saved',
                header: 'Saved!',
                icon: 'pi pi-check-circle text-green-500',
                acceptButtonStyleClass: 'p-button-center',
                acceptIcon: '',
                acceptLabel: 'Ok',
                rejectVisible: false,
                
              })
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

  initForm(data: AppParameter | null): void {
    if(this.type == "hr"){
      this.editForm = new FormGroup({
        subject: new FormControl(data ? data.hrEmailSubject : null),
        text: new FormControl(data ? data.hrEmailText : null),
      });  
    }else{
      this.editForm = new FormGroup({
        subject: new FormControl(data ? data.consultantEmailSubject : null),
        text: new FormControl(data ? data.consultantEmailText : null),
      });  
    }
    
  }
  close() {
    this.ref.close();
  }
}

