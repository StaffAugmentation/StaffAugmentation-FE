import { Component, OnInit } from '@angular/core';
import { Approver } from '@models/approver';
import { ApproverService } from '@services/approver.service';
import { MessageService } from 'primeng/api';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AddEditApproverComponent } from './add-edit-approver/add-edit-approver.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
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
export class ApproverComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listApprover: Approver[] = [];
  selectedApprover!: Approver;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'appFirstName', label: 'First name' },
      { id: 'appLastName', label: 'Last name' },
    ],
    loading: false,
    exportLoading: false
  };
  
  Approver: Approver[] = [];
  constructor(private approverService: ApproverService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private fileExporter: FileExporterService) { 
    }
  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getCompanies();
  }

  getCompanies(): void {
    this.tableOptions.loading = true;

    this.approverService.getAll().subscribe({
      next: (res) => {
        this.listApprover = res;
        this.tableOptions.loading = false;
      },
      error: (err: any) => {
        this.toast.add({ severity: 'error', summary: err.error });
      }
    });
  }

  refresh():void{
    this.getCompanies();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditApproverComponent, {
        header: `Add approver`,
        width: '60%',
        height: '50',
        data: {
          Approver: this.listApprover[0]
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
      });
    }
    else if (this.selectedApprover?.id) {
      this.modalAddEdit = this.modalService.open(AddEditApproverComponent, {
        header: `Edit approver`,
        width: '60%',
        height: '50',
        data: {
          idApprover: this.selectedApprover.id,
          ApproverName:this.selectedApprover.appFirstName,
          bankAccount:this.selectedApprover.appLastName,
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getCompanies();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }

  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    setTimeout(()=>{
      this.fileExporter.exportExcel(this.listApprover,'Approver').finally(()=> this.tableOptions.exportLoading = false);
    },50);
  }

  delete():void{
    if (this.selectedApprover?.id) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete '+this.selectedApprover.appFirstName+' '+this.selectedApprover.appLastName,
        header: 'Confirm',
        icon:'pi pi-exclamation-triangle',
        accept: () => {
          this.approverService.deleteApprover(this.selectedApprover.id).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Approver deleted successfuly" });
              this.getCompanies();
            },
            error: (err: any) => {
              this.toast.add({ severity: 'error', summary: err.error });
            }
          });
        }

      });  
    } else{
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    } 
  }

}
