import { Component, OnInit } from '@angular/core';
import { SubContractor } from '@models/subContractor';
import { SubContractorService } from '@services/subContractor.service';
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
  listSubContractor: SubContractor[] = [];
  selectedSubContractor!: SubContractor | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'valueId', label: 'Value' },
      { id: 'subContBa', label: 'IBAN Number' },
      { id: 'subContBicsw', label: 'BIC/SW' },
      { id: 'approverName', label: 'Approver' },
      { id: 'subContVatRate', label: 'VAT rate' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private subContractorService: SubContractorService, private modalService: DialogService, 
    private modalAddEdit: DynamicDialogRef, private toast: MessageService,private confirmationService: ConfirmationService, 
    private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getSubContractors();
  }

  getSubContractors(): void {
    this.tableOptions.loading = true;
    this.subContractorService.getAll().subscribe({
      next: (res) => {
        this.listSubContractor = res;
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
    this.getSubContractors();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditSubcontractorComponent, {
        header: `Add subContractor`,
        style: { width: '95%', maxWidth: '750px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getSubContractors();
      });
    }
    else if (this.selectedSubContractor?.id) {
      this.modalAddEdit = this.modalService.open(AddEditSubcontractorComponent, {
        header: `Edit subContractor`,
        style: { width: '95%', maxWidth: '750px' },
        data: { idSubContractor: this.selectedSubContractor.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getSubContractors();
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
    this.selectedSubContractor = null;
    table.clear();
  }
  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    this.fileExporter.exportExcel(this.listSubContractor.map(SubContractor => {
      let subC: any = { ...SubContractor };
      subC['Value'] = SubContractor.valueId;
      subC['IBAN Number'] = SubContractor.subContBa;
      subC['BIC/SW'] = SubContractor.subContBicsw;
      subC['Approver'] = subC['approverName'];
      subC['VAT rate'] = SubContractor.subContVatRate;
      subC['Payment terms'] = subC['paymentTermName'];
      subC['Type of cost'] = subC['typeOfCostName'];
      subC['VAT number'] = SubContractor.vatNumber;
      subC['Legal entity name'] = SubContractor.legalEntityName;
      subC['Legal entity address'] = SubContractor.legalEntityAdress;
      subC['ID Number'] = SubContractor.idNumber;
      subC['Official'] = SubContractor.isOfficial;

      delete subC['id'];
      delete subC['valueId'];
      delete subC['subContBa'];
      delete subC['subContBicsw'];
      delete subC['idApproverSub'];
      delete subC['subContVatRate'];
      delete subC['isOfficial'];
      delete subC['legalEntityAdress'];
      delete subC['legalEntityName'];
      delete subC['vatNumber'];
      delete subC['idNumber'];
      delete subC['idPaymentTerm'];
      delete subC['idTypeOfCost'];
      delete subC['approverName'];
      delete subC['paymentTermName'];
      delete subC['typeOfCostName'];
      return subC;
    }), 'SubContractor').finally(() => this.tableOptions.exportLoading = false);
  }

  delete(): void {
    if (this.selectedSubContractor?.id) {
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
          this.subContractorService.deleteSubContractor(this.selectedSubContractor?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "SubContractor deleted successfuly" });
              this.getSubContractors();
              this.selectedSubContractor = null;
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
