import { Component, OnInit } from '@angular/core';
import { HighestDegree } from '@models/highest-degree';
import { HighestDegreeService } from '@services/highest-degree.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AddEditHighestDegreeComponent } from './add-edit-highest-degree/add-edit-highest-degree.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  standalone: true,
  selector: 'app-highest-degree',
  templateUrl: './highest-degree.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})

export class HighestDegreeComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listHighestDegree: HighestDegree[] = [];
  selectedHighestDegree!: HighestDegree;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'id', label: 'Id' },
      { id: 'value', label: 'Value' },
      { id: 'isActive', label: 'State' }
    ],
    loading: false,
    exportLoading: false
  };
  HighestDegree: HighestDegree[] = [];
  searchTable: string = '';

  constructor(private HighestDegreeService: HighestDegreeService, private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private fileExporter: FileExporterService,
    private confirmationService: ConfirmationService) {
    }
  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getHighestDegrees();
  }

  getHighestDegrees(): void {
    this.tableOptions.loading = true;

    this.HighestDegreeService.getAll().subscribe({
      next: (res) => {
        this.listHighestDegree = res;
        this.tableOptions.loading = false;
      },
      error: (err: any) => {
        let errMessage:string = err.error;
        if (err.status !=400) {
          errMessage = 'Something went wrong with the server !';
        }
        this.toast.add({ severity: 'error', summary: errMessage });
      }
    });
  }

  refresh(): void {
    this.getHighestDegrees();
  }

  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditHighestDegreeComponent, {
        header: `Add Highest Degree`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getHighestDegrees();
      });
    }
    else if (this.selectedHighestDegree?.id) {
      this.modalAddEdit = this.modalService.open(AddEditHighestDegreeComponent, {
        header: `Edit Highest Degree`,
        style: { width: '90%', maxWidth: '500px' },
        data: { id: this.selectedHighestDegree.id }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getHighestDegrees();
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
    this.searchTable = '';
    this.tableOptions.visibleCols = this.tableOptions.cols;
    table.clear();
  }

  delete(): void {
    if (this.selectedHighestDegree?.id) {
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
          this.HighestDegreeService.deleteHighestDegree(this.selectedHighestDegree?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Highest Degree deleted successfuly" });
              this.getHighestDegrees();
              this.selectedHighestDegree == null;
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

    exportExcel(): void {
      this.tableOptions.exportLoading = true;
      // let data = this.listBR.filter(br => br)
        this.fileExporter.exportExcel(this.listHighestDegree.map(highestDegree =>{
          let htd : any = {...highestDegree};
          htd['Value'] = highestDegree.value;
          htd['State'] = highestDegree.isActive;
          delete htd['value'];
          delete htd['isActive'];
          return htd;
        }),'highestDegree').finally(()=> this.tableOptions.exportLoading = false);
      }

}
