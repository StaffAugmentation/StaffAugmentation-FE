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
import { MenuItem, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';



@Component({
  standalone: true,
  selector: 'app-add-edit-partner',
  templateUrl: './add-edit-partner.component.html',
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
    CalendarModule,
    InputSwitchModule,
    InputTextareaModule,
    CheckboxModule,
    AutoCompleteModule,
    TableModule
  ]
})
export class AddEditPartnerComponent implements OnInit {
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  filteredRecruitments!: any[];
  recruitments:any;
  company!: any[];
  resourceType!: any[];
  subconstractor!: any[];
  listFile!: any[];
  tableOptionsFile: any = {
    visibleCols: [],
    cols: [
      { id: 'fileName', label: 'File name' },
      { id: 'appName', label: 'App name' },
      { id: 'docType', label: 'Document type' },

    ],
    loading: false,
    exportLoading: false
  };

  constructor(private ref: DynamicDialogRef, public toast: MessageService, private modalService: DialogService) { }

  ngOnInit(): void {
    this.initForm(null);
    this.tableOptionsFile.visibleCols = this.tableOptionsFile.cols;
    this.getFile();
  }
  getFile(): void {
    this.listFile = [ ];
  };
  onSubmit() {
    this.isSubmited = true;
    this.ref.close();
  }
  initForm(data: null): void {
    this.addEditForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      company: new FormControl(null),
      recruitment: new FormControl(null),
      resourceType: new FormControl(null),
      checked: new FormControl(null),
      subconstractor: new FormControl(null),
      availabilityD: new FormControl(null),
      foA: new FormControl(null),
      proposalC: new FormControl(null),
      draftA: new FormControl(null),
      detailI: new FormControl(null),
      comment: new FormControl(null),
    });
  }

  filterRecruitment(event: { query: any; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.recruitments.length; i++) {
      let recruitment = this.recruitments[i];
      if (recruitment.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(recruitment);
      }
    }

    this.filteredRecruitments = filtered;
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
