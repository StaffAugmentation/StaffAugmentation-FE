import { Component, OnInit } from '@angular/core';
import { Subcontractor } from '@models/subcontractor';
import { SubcontractorService } from '@services/subcontractor.service';
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
import { AddEditSubcontractorComponent } from './add-edit-subcontractor/add-edit-subcontractor.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';

@Component({
  standalone: true,
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
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
  ]
})
export class SubcontractorComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listSubcontractor: Subcontractor[] = [];
  selectedSubcontractor!: Subcontractor | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'valueId', label: 'Value' },
      { id: 'ba', label: 'IBAN Number' },
      { id: 'bicsw', label: 'BIC/SW' },
      { id: 'approver', label: 'Approver' },
      { id: 'vatRate', label: 'VAT rate' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private subcontractorService: SubcontractorService, private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef, private toast: MessageService,private confirmationService: ConfirmationService,
    private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getSubcontractors();
  }

  getSubcontractors(): void {
    this.tableOptions.loading = true;
    this.subcontractorService.getAll().subscribe({
      next: (res) => {
        this.listSubcontractor = res;
        this.tableOptions.loading = false;
      },
      error: (err: any) => {
        let errMessage: string = err.error;
        if (err.status != 400) {
          errMessage = 'Something went wrong with the server !';
        }
        this.toast.add({ severity: 'error', summary: errMessage });
      }
    });
  }

  refresh(): void {
    this.getSubcontractors();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditSubcontractorComponent, {
        header: `Add subcontractor`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getSubcontractors();
      });
    }
    else if (this.selectedSubcontractor?.id) {
      this.modalAddEdit = this.modalService.open(AddEditSubcontractorComponent, {
        header: `Edit subcontractor`,
        style: { width: '95%', maxWidth: '750px' },
        data: { idSubcontractor: this.selectedSubcontractor.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getSubcontractors();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }

  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table): void {
    table.filterGlobal(this.searchTable, 'contains');
  }

  clearFilter(table: Table): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.searchTable = '';
    this.selectedSubcontractor = null;
    table.clear();
  }
  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listSubcontractor.map(Subcontractor => {
      let subC: any ={
        'Value' : Subcontractor.valueId,
        'IBAN Number' : Subcontractor.ba,
        'VAT number' : Subcontractor.vatNumber,
        'BIC/SW' : Subcontractor.bicsw,
        'Approver' :Subcontractor.approver ?(Subcontractor.approver?.firstName +" "+ Subcontractor.approver?.lastName) : "",
        'VAT Rate': Subcontractor.vatRate
      }
      return subC;
    }), 'Subcontractor').finally(() => this.tableOptions.exportLoading = false);
  }

  delete(): void {
    if (this.selectedSubcontractor?.id) {
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
          this.subcontractorService.deleteSubcontractor(this.selectedSubcontractor?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Subcontractor deleted successfuly" });
              this.getSubcontractors();
              this.selectedSubcontractor = null;
            },
            error: (err: any) => {
              let errMessage: string = err.error;
              if (err.status != 400) {
                errMessage = 'Something went wrong with the server !';
              }
              this.toast.add({ severity: 'error', summary: errMessage });
            }
          });
        }

      });
    } else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
  }

}
