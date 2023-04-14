import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { AddEditScComponent } from './add-edit-sc/add-edit-sc.component';


@Component({
  standalone: true,
  selector: 'app-sprint-contract-ui',
  templateUrl: './sprint-contract-ui.component.html',
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
    CommonModule
  ],
  animations: [
    trigger('showHide', [
      state('true', style({
        height: 0,
        opacity: 0,
        marginTop: 0
      })),
      state('false', style({
        height: 'fit-content',
        opacity: 1,
        marginTop: 12
      })),
      transition('true => false', [
        animate('300ms ease-out', keyframes([
          style({ height: 'fit-content' }),
          style({ opacity: 1, marginTop: 12 })
        ]))
      ]),
      transition('false => true', [
        animate('300ms  ease-in', keyframes([
          style({ opacity: 0, height: '0', marginTop: 0 })
        ]))
      ]),
    ])
  ]
})
export class SprintContractUiComponent implements OnInit {

  advancedSearch: any = {
    requestNumber: '',
    frameworkContract: [],
    dtRfReceived: new Date()
  };
  isCollapsed: any = {
    advancedSearch: false,
    list: false
  };
  frameworkContracts = [];
  listSC: any[] = [
    {id:'1',requestNumber:'WIPO1_0000123002',requestOrExtension:'Extension',scNumber:'WIPO1_0000123002',department:'WIPO',consultant:'Anthony Asanka',salesPrice:'191.00 CHF',signatureDate:'02/01/2023'},
    {id:'2',requestNumber:'BIS-BC-23-032',requestOrExtension:'Extension',scNumber:'BIS-BC-23-032',department:'Foyer',consultant:'Farid Lagssaibi',salesPrice:'410.00'}
  ];
  selectedSC: any = {};
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'requestNumber', label: 'Request number' },
      { id: 'requestOrExtension', label: 'Request or extension' },
      { id: 'scNumber', label: 'SC number' },
      { id: 'department', label: 'Department' },
      { id: 'consultant', label: 'Consultant' },
      { id: 'salesPrice', label: 'Sales price' },
      { id: 'placeOfDelivery', label: 'Place of delivery' },
      { id: 'frameworkContract', label: 'Framework contract'},
      { id: 'signatureDate', label: 'Signature date'},
      { id: 'maximumEndDate', label: 'Maximum end date' },
      { id: 'specificClientCode', label: 'Specific client code' },
      { id: 'projectStartDate', label: 'Project start date' },
      { id: 'contractStatus', label: 'Contract status'},
      { id: 'totalPrice', label: 'Total price'}
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
  }

  search(): void {
    this.isCollapsed.advancedSearch = true;
    this.isCollapsed.list = false;
    this.tableOptions.loading = true;
    this.listSC;
    this.tableOptions.loading = false;
   
  }

  addEdit(action: string): void {
    if(action == 'add'){
      this.modalAddEdit = this.modalService.open(AddEditScComponent, {
        header: `Add Sprint Contract`,
        width: '85%',
        height: '85%',
        data: {
          action:'add'
        }
      });
      this.modalAddEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
    else if(this.selectedSC?.id){
      this.modalAddEdit = this.modalService.open(AddEditScComponent, {
        header: 'Edit '+this.selectedSC.requestNumber,
        width: '85%',
        height: '85%',
        data: {
          springContract: this.selectedSC
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

  onGlobalFilter(table: Table, event: Event): void {
    console.log(table);

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listSC.map(SpringContractUI => {
      let contract: any ={
        'Request number' : SpringContractUI.requestNumber,
        'Request or extension' : SpringContractUI.requestOrExtension,
        'SC number' : SpringContractUI.scNumber,
        'Department' : SpringContractUI.department,
        'Consultant' :SpringContractUI.consultant,
        'Sales price': SpringContractUI.salesPrice
      }
      return contract;
    }), 'SpringContractUI').finally(() => this.tableOptions.exportLoading = false);
  }
  refresh(){
    this.ngOnInit();
  }
  history(){

  }
  remove(){
    if(this.selectedSC?.id){
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
          this.toast.add({ severity: 'success', summary: "Delete row", detail:this.selectedSC.id });
        }
     })
   } 
   else{
    this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
   }
 } 
}
