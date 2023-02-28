import { Component, OnInit} from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CompanyService } from '@services/company.service';
import { Company } from '@models/company';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    RadioButtonModule,
    ReactiveFormsModule
  ]
})
export class AddEditCompanyComponent implements OnInit {
 
  id:any
  custom=true
  selectedValue="0"
  addEditForm!: FormGroup;
  NTTData = ['Yes', 'No'];
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.addEditForm = new FormGroup({
      companyName: new FormControl(null,[Validators.required]),
      ibanNumber: new FormControl(null),
      cmpEmail: new FormControl(null, [Validators.required,Validators.email]),
      vatLegal: new FormControl(null),
      bic: new FormControl(null),
      approver: new FormControl(null),
      vatRate: new FormControl(null),
      isNTTData: new FormControl('No'),
    })
  }
  onSubmit() {
  if(this.addEditForm.valid){
    console.log(this.addEditForm.valid)
  this.companyService.addCompany(new Company(this.id,this.addEditForm.value.companyName,this.addEditForm.value.ibanNumber,false,this.addEditForm.value.isNTTData,this.addEditForm.value.vatLegal,this.addEditForm.value.bic,this.addEditForm.value.vatRate,this.addEditForm.value.approver,this.addEditForm.value.cpmEmail)).subscribe();
}
}
close(){
  console.log("close");
}
}
