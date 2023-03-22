import { Component, OnInit } from '@angular/core';
import { PTMOwner } from '@models/ptmOwner';
import { PTMOwnerService } from '@services/ptm-owner.service';
import { MessageService } from 'primeng/api';
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
import { AddEditPTMOwnerComponent } from './add-edit-ptm-owner/add-edit-ptm-owner.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  standalone: true,
  selector: 'app-PTMOwner',
  templateUrl: './ptm-owner.component.html',
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
    ConfirmDialogModule,
    BadgeModule
  ]
})
export class PTMOwnerComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listPTMOwner: PTMOwner[] = [];
  selectedPTMOwner!: PTMOwner | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'valueId', label: 'Value' },
      { id: 'ptmOwnerBA', label: 'IBAN Number' },
      { id: 'ptmOwnerVatNumber', label: 'VAT Number' },
      { id: 'ptmOwnerBICSW', label: 'BIC/SW' },
      { id: 'approverName', label: 'Approver' },
      { id: 'ptmOwnerVatRate', label: 'VAT_Rate' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private PTMOwnerService: PTMOwnerService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getPTMOwners();
  }
  getPTMOwners(): void {
    this.tableOptions.loading = true;

    this.PTMOwnerService.getAll().subscribe({
      next: (res) => {
        this.listPTMOwner = res;
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
    this.getPTMOwners();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditPTMOwnerComponent, {
        header: `Add PTM Owner`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getPTMOwners();
      });
    }
    else if (this.selectedPTMOwner?.id) {
      this.modalAddEdit = this.modalService.open(AddEditPTMOwnerComponent, {
        header: `Edit PTM Owner`,
        style: { width: '95%', maxWidth: '750px' },
        data: {
          id: this.selectedPTMOwner.id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getPTMOwners();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'Select a row.' })
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
    table.clear();
    this.searchTable = '';
  }
  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listPTMOwner.map(PTMOwner => {
      let appr: any = { ...PTMOwner };
      appr['Value'] = PTMOwner.valueId;
      appr['IBAN Number'] = PTMOwner.ptmOwnerBA;
      appr['VAT number'] = PTMOwner.ptmOwnerVatNumber;
      appr['BIC/SW'] = PTMOwner.ptmOwnerBICSW;
      appr['Approver'] = PTMOwner.idApprover;
      appr['VAT_Rate'] = PTMOwner.ptmOwnerVatRate;
      delete appr['id'];
      delete appr['valueId'];
      delete appr['ptmOwnerBA'];
      delete appr['ptmOwnerVatNumber'];
      delete appr['ptmOwnerBICSW'];
      delete appr['idApprover'];
      delete appr['ptmOwnerVatRate'];
      delete appr['isEveris'];
      delete appr['approverName'];

      return appr;
    }), 'PTMOwner').finally(() => this.tableOptions.exportLoading = false);
  }

  delete(): void {
    if (this.selectedPTMOwner?.id) {
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
          this.PTMOwnerService.deletePTMOwner(this.selectedPTMOwner?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "PTM Owner deleted successfuly" });
              this.getPTMOwners();
              this.selectedPTMOwner = null;
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
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'Select a row.' })
    }
  }

}
