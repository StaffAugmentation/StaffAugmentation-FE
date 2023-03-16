import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ProfileService } from '@services/profile.service';
import { Profile } from '@models/profile';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-profile',
  templateUrl: './add-edit-profile.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    RadioButtonModule,
    ReactiveFormsModule,
    SharedModule,
    TabViewModule
  ]
})
export class AddEditProfileComponent implements OnInit {

  id!: number;
  selectedValue!: Profile;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private profileService: ProfileService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.idProfile;
    this.initForm(null);
    if (this.id) {
      this.profileService.getOne(this.id).subscribe({
        next: res => {
          this.selectedValue = res;
          this.initForm(res);
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
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      if (this.id) {
        this.profileService.updateProfile(new Profile(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "Profile updated successfuly" });
            this.ref.close();
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

      } else {
        this.profileService.addProfile(new Profile(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Profile added successfuly" });
            this.actionLoading = false;
            this.ref.close();
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
  initForm(data: Profile | null): void {
    this.addEditForm = new FormGroup({
      valueId: new FormControl(data ? data.valueId : '', [Validators.required]),
      isActive: new FormControl(data ? data.isActive : false, [Validators.required]),
    });
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