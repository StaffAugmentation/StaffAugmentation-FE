import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { PlaceOfDeliveryService } from '@services/place-of-delivery.service';
import { PlaceOfDelivery } from '@models/place-of-delivery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module'

@Component({
  standalone: true,
  selector: 'app-add-edit-PlaceOfDelivery',
  templateUrl: './add-edit-place-of-delivery.component.html',
  styleUrls: ['./add-edit-place-of-delivery.component.scss'],
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
export class AddEditPlaceOfDeliveryComponent implements OnInit {

  id!: number;
  selectedValue!: PlaceOfDelivery;
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(private ref: DynamicDialogRef, private PlaceOfDeliveryService: PlaceOfDeliveryService, private toast: MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.id = this.config.data?.id;
    if(this.id){
      this.PlaceOfDeliveryService.getOne(this.id).subscribe({
        next: res=>{
          this.selectedValue = res;
          this.addEditForm = new FormGroup({
            valueId: new FormControl(res.valueId, [Validators.required]),
            isActive: new FormControl(res.isActive),
          });
        },
        error: err => {

        }
      })
    }
    else{
      this.addEditForm = new FormGroup({
        valueId: new FormControl(null, [Validators.required]),
        isActive: new FormControl(true),
      });
    }
  }
  onSubmit() {
    this.isSubmited = true;
    console.log(this.addEditForm.value);
    if (this.addEditForm.valid) {
      if(this.id){
        this.PlaceOfDeliveryService.updatePlaceOfDelivery(new PlaceOfDelivery(
          this.id,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Place Of Delivery updated successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
      }else{
        this.PlaceOfDeliveryService.addPlaceOfDelivery(new PlaceOfDelivery(
          this.id || 0,
          this.addEditForm.value.valueId,
          this.addEditForm.value.isActive)
        ).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: "Place Of Delivery added successfuly" });
            this.ref.close();
          },
          error: (err: any) => {
            this.toast.add({ severity: 'error', summary: err.error });
          }
        });
      }
    }
  }
  close() {
    this.ref.close();
  }
}


