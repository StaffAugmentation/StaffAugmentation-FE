import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { CountryService } from '@services/country.service';
import { Country } from '@models/country';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
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
export class AddEditCountryComponent implements OnInit {

  id!: number;
  selectedValue!: Country;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;

  constructor(private ref: DynamicDialogRef, private countryService: CountryService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.idCountry;
    this.initForm(null);
    if (this.id) {
      this.countryService.getOne(this.id).subscribe({
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
        this.countryService.updateCountry(new Country(
          this.id,
          this.addEditForm.value.countryName,
          this.addEditForm.value.hotelCeiling,
          this.addEditForm.value.dailyAllowance,
          this.addEditForm.value.isVisible
        )
        ).subscribe({
          next: () => {
            this.actionLoading = false;
            this.toast.add({ severity: 'success', summary: "Country updated successfuly" });
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
        this.countryService.addCountry(new Country(
          this.id || 0,
          this.addEditForm.value.countryName,
          this.addEditForm.value.hotelCeiling,
          this.addEditForm.value.dailyAllowance,
          this.addEditForm.value.isVisible
          )
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Country added successfuly" });
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
  initForm(data: Country | null): void {
    this.addEditForm = new FormGroup({
      countryName: new FormControl(data ? data.countryName : null, [Validators.required]),
      hotelCeiling: new FormControl(data ? data.hotelCeiling : null),
      dailyAllowance: new FormControl(data ? data.dailyAllowance : null),
      isVisible: new FormControl(data ? data.isVisible : false),
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
