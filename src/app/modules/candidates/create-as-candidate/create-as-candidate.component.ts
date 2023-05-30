import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  standalone: true,
  selector: 'app-create-as-candidate',
  templateUrl: './create-as-candidate.component.html',
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
    CalendarModule,
    TableModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
    InputTextareaModule,
    SplitButtonModule,
    FileUploadModule,
    HttpClientModule,
    CheckboxModule
  ]
})
export class CreateAsCandidateComponent implements OnInit {

  addEditForm!: FormGroup;
  addForm!: FormGroup;
  addReferralForm!: FormGroup;
  isSubmited: boolean = false;
  isSubmited2: boolean = false;
  isSubmitedReferral: boolean = false;
  actionLoading: boolean = false;
  selectedCandidate: any;
  resourceType: any[]=[];
  TypeOfCost: any[]=[];
  paymentTerms: any[]=[];

  constructor(private toast: MessageService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.selectedCandidate = this.config.data?.candidate;
    this.initForm(this.selectedCandidate);
  }


  initForm(data: any): void {
    this.addEditForm = new FormGroup({
      firstName: new FormControl(data.firstName, [Validators.required]),
      lastName: new FormControl(data.lastName, [Validators.required]),
      resourceType: new FormControl(data.resourceType, [Validators.required]),
      legalEntityName: new FormControl(data.legalEntityName),
      vatNumber: new FormControl(data.vatNumber),
      idNumber: new FormControl(data.idNumber),
      paymentTerms: new FormControl(data.paymentTerms),
      TypeOfCost: new FormControl(data.TypeOfCost),
      ibanNumber: new FormControl(data.ibanNumber),
      bicSwift: new FormControl(data.bicSwift),
      vatRate: new FormControl(data.vatRate),
      approver: new FormControl(data.approver),
      legalEntityAddress: new FormControl(data.legalEntityAddress),
    })
  }  

  onSubmit(): void {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  close(): void {
    this.ref.close();
  }

}
