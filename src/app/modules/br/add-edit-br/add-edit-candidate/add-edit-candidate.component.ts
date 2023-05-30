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
import { CompanyService } from '@services/company.service';
import { RecruitmentService } from '@services/recruitment.service';
import { SubcontractorService } from '@services/subcontractor.service';
import { Recruitment } from '@models/recruitment';
import { Company } from '@models/company';
import { Subcontractor } from '@models/subcontractor';

@Component({
  standalone: true,
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
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
export class AddEditCandidateComponent implements OnInit {
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  filteredRecruitments: Recruitment[] = [];
  recruitments: Recruitment[] = [];
  company: Company[] = [];
  resourceType!: any[];
  subcontractor: Subcontractor[] = [];
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

  constructor(
    private ref: DynamicDialogRef,
    public toast: MessageService,
    private modalService: DialogService,
    private companyService: CompanyService,
    private recruitmentService: RecruitmentService,
    private subcontractorService: SubcontractorService,
  ) { }

  ngOnInit(): void {
    this.initForm(null);
    this.tableOptionsFile.visibleCols = this.tableOptionsFile.cols;
    this.getFile();
    this.getCompany();
    this.getRecruitment();
    this.getSubcontractor();
  }
  getFile(): void {
    this.listFile = [];
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
      subcontractor: new FormControl({ value: null, disabled: true }),
      availabilityD: new FormControl(null),
      foA: new FormControl({ value: null, disabled: true }),
      proposalC: new FormControl({ value: null, disabled: true }),
      draftA: new FormControl({ value: null, disabled: true }),
      detailI: new FormControl(null),
      comment: new FormControl({ value: null, disabled: true }),
    });
  }
  getCompany(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.company = res;
        this.company = this.company.map((company: any) => {
          return { ...company, displayLabel: company.name };
        });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  getRecruitment(): void {
    this.recruitmentService.getAll().subscribe({
      next: (res) => {
        this.recruitments = res;
        this.recruitments = this.recruitments.map((recruitments: any) => {
          return { ...recruitments, displayLabel: recruitments.name };
        });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }
  filterRecruitment(event: { query: any; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.recruitments.length; i++) {
      let recruitment:any = this.recruitments[i];
      if (recruitment.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(recruitment);
      }
    }

    this.filteredRecruitments = filtered;
  }
  getSubcontractor(): void {
    this.subcontractorService.getAll().subscribe({
      next: (res) => {
        this.subcontractor = res;
        this.subcontractor = this.subcontractor.map((subcontractor: any) => {
          return { ...subcontractor, displayLabel: subcontractor.valueId };
        });
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
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
