import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { Table, TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { FileExporterService } from '@services/file-exporter.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EditConsultantComponent } from './edit-consultant/edit-consultant.component';
import { AddEditCandidateComponent } from './add-edit-candidate/add-edit-candidate.component';
import { CreateAsCandidateComponent } from './create-as-candidate/create-as-candidate.component';
import { HistoryComponent } from './history/history.component';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  standalone: true,
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    CardModule,
    DropdownModule,
    AutoCompleteModule,
    CommonModule,
    TabViewModule,
    SplitButtonModule
  ]
})
export class CandidatesComponent implements OnInit {

  export: any[]=[];
  listConsultant: any[] = [
    {id:'1', consultantName:'6431 Robertino GHINDAR', typeOfContract:'Employee'},
  ];
  selectedConsultant: any = {};
  listCandidate: any[] = [
    {id:'1', code:'1429', candidateName:'Liviu Florin'},
    {id:'2', code:'1430', candidateName:'Rodrigo Coelho', resourceType:'Recruitment'},
  ];
  selectedCandidate: any = {};
  listCandidatePartner: any[] = [
    {id:'1', code:'1515', candidateName:'Marcel Milea', resourceType:'Baseline'},
    {id:'2', code:'1620', candidateName:'Cristina Ezaru', resourceType:'Recruitment'},
  ];
  selectedCandidatePartner: any = {};
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'consultantName', label: 'Consultant name' },
      { id: 'role', label: 'Role' },
      { id: 'resourceEmail', label: 'Resource email' },
      { id: 'resourcePhone', label: 'Resource phone' },
      { id: 'nationality', label: 'Nationality' },
      { id: 'typeOfContract', label: 'Type of contract' },
      { id: 'clientProjectManager', label: 'Client project manager' },
      { id: 'approver', label: 'Approver' },
      { id: 'ibanNumber', label: 'IBAN Number' },
      { id: 'bic/swift', label: 'BIC/SWIFT'},
      { id: 'vatNumber', label: 'VAT Number' },
    ],
    colsCandidate: [
      { id: 'code', label: 'Code' },
      { id: 'candidateName', label: 'Candidate name' },
      { id: 'resourceType', label: 'Resource type' },
    ],
    loading: false,
    exportLoading: false
  };

  constructor(
    private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private fileExporter: FileExporterService) { }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.export = [
      { label: 'All consultants' },
      { label: 'Active consultants'} ,
      { label: 'Employee list'},
      { label: 'Subcontractor list'}
    ];
  }

  edit(): void {
    if(this.selectedConsultant?.id){
      this.modalAddEdit = this.modalService.open(EditConsultantComponent, {
        header: 'Edit consultant '+this.selectedConsultant.consultantName,
        width: '90%',
        height: '85%',
        data: {
          consultant: this.selectedConsultant
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
    
  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  get globalFilterFieldsCandidate(): string[] {
    return this.tableOptions.colsCandidate.map((col: any) => col.id);
  }

  get globalFilterFieldsCandidatePartner(): string[] {
    return this.tableOptions.colsCandidate.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table, event: Event): void {
    console.log(table);

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listConsultant.map(Consultant => {
      let consultant: any ={
        'Consultant name' : Consultant.consultantName,
        'Role' : Consultant.role,
        'Resource email' : Consultant.resourceEmail,
        'Resource phone' : Consultant.resourcePhone,
        'Type of contract' :Consultant.typeOfContract,
        'Client project manager': Consultant.clientProjectManager
      }
      return consultant;
    }), 'Consultant').finally(() => this.tableOptions.exportLoading = false);
  }

  refresh(){
    this.ngOnInit();
  }

  history(){
    if(this.selectedConsultant?.id){
      this.modalAddEdit = this.modalService.open(HistoryComponent, {
        header: 'History Consultant Management\n'+this.selectedConsultant.consultantName,
        width: '90%',
        height: '85%',
        data: {
          consultant: this.selectedConsultant
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

  import(){

  }

 addEdit(action: string, candidate:string): void {
  if(candidate == 'candidate'){
    if(action == 'add'){
      this.modalAddEdit = this.modalService.open(AddEditCandidateComponent, {
        header: `Add`,
        width: '80%',
        height: '90%',
        data: {
          action: 'add'
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else if(this.selectedCandidate?.id){
      this.modalAddEdit = this.modalService.open(AddEditCandidateComponent, {
        header: `Edit`,
        width: '80%',
        height: '95%',
        data: {
          candidate: this.selectedCandidate
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
  if(candidate == 'candidatePartner'){
    if(action == 'add'){
      this.modalAddEdit = this.modalService.open(AddEditCandidateComponent, {
        header: `Add`,
        width: '80%',
        height: '90%',
        data: {
          action: 'add'
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else if(this.selectedCandidatePartner?.id){
      this.modalAddEdit = this.modalService.open(AddEditCandidateComponent, {
        header: `Edit`,
        width: '80%',
        height: '95%',
        data: {
          candidate: this.selectedCandidatePartner
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
  
 }

 createAsConsultant(candidate:string){
  if(candidate == 'candidate'){
    if(this.selectedCandidate?.id){
      this.modalAddEdit = this.modalService.open(CreateAsCandidateComponent, {
        header: 'Create as consultant',
        width: '90%',
        height: '85%',
        data: {
          candidate: this.selectedCandidate
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
  if(candidate == 'candidatePartner'){
    if(this.selectedCandidatePartner?.id){
      this.modalAddEdit = this.modalService.open(CreateAsCandidateComponent, {
        header: 'Create as consultant',
        width: '90%',
        height: '85%',
        data: {
          candidate: this.selectedCandidatePartner
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
 }

 exportExcelCandidate(candidate:string): void {
  if(candidate == 'candidate'){
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listCandidate.map(Candidate => {
      let candidate: any ={
        'Code' : Candidate.code,
        'Candidate name' : Candidate.candidateName,
        'Resource type' : Candidate.resourceType
      }
      return candidate;
    }), 'Candidate').finally(() => this.tableOptions.exportLoading = false);
  }
  if(candidate == 'candidatePartner'){
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listCandidatePartner.map(Candidate => {
      let candidate: any ={
        'Code' : Candidate.code,
        'Candidate name' : Candidate.candidateName,
        'Resource type' : Candidate.resourceType
      }
      return candidate;
    }), 'Candidate').finally(() => this.tableOptions.exportLoading = false);
  }
 }

 remove(candidate:string){
  if(candidate == 'candidate'){
    if(this.selectedCandidate?.id){
      this.confirmationService.confirm({
        message: 'You won\'t be able to revert this! ',
        header: 'Are you sure?',
        icon: 'pi pi-exclamation-circle text-yellow-500',
        acceptButtonStyleClass: 'p-button-danger p-button-raised',
        rejectButtonStyleClass: 'p-button-secondary p-button-raised',
        acceptLabel: 'Yes, delete it',
        rejectLabel: 'No, cancel',
        defaultFocus: 'reject',
        accept: () => {
          this.toast.add({ severity: 'success', summary: "Delete row", detail:this.selectedCandidate.id });
        }
     })
    } 
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
  if(candidate == 'candidatePartner'){
    if(this.selectedCandidatePartner?.id){
      this.confirmationService.confirm({
        message: 'You won\'t be able to revert this! ',
        header: 'Are you sure?',
        icon: 'pi pi-exclamation-circle text-yellow-500',
        acceptButtonStyleClass: 'p-button-danger p-button-raised',
        rejectButtonStyleClass: 'p-button-secondary p-button-raised',
        acceptLabel: 'Yes, delete it',
        rejectLabel: 'No, cancel',
        defaultFocus: 'reject',
        accept: () => {
          this.toast.add({ severity: 'success', summary: "Delete row", detail:this.selectedCandidatePartner.id });
        }
     })
    } 
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }
  if(candidate == 'consultant'){
    if(this.selectedConsultant?.id){
      this.confirmationService.confirm({
        message: 'You won\'t be able to revert this! ',
        header: 'Are you sure?',
        icon: 'pi pi-exclamation-circle text-yellow-500',
        acceptButtonStyleClass: 'p-button-danger p-button-raised',
        rejectButtonStyleClass: 'p-button-secondary p-button-raised',
        acceptLabel: 'Yes, delete it',
        rejectLabel: 'No, cancel',
        defaultFocus: 'reject',
        accept: () => {
          this.toast.add({ severity: 'success', summary: "Delete row", detail:this.selectedConsultant.id });
        }
     })
   } 
   else{
    this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
   }
  }
 } 

}
