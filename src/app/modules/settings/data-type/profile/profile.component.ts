import { Component, OnInit } from '@angular/core';
import { Profile } from '@models/profile';
import { ProfileService } from '@services/profile.service';
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
import { AddEditProfileComponent } from './add-edit-profile/add-edit-profile.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileExporterService } from 'src/app/services/file-exporter.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
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
export class ProfileComponent implements OnInit {

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listProfile: Profile[] = [];
  selectedProfile!: Profile | null;
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'id', label: 'Id' },
      { id: 'valueId', label: 'Value' },
      { id: 'isActive', label: 'State' },
    ],
    loading: false,
    exportLoading: false
  };
  searchTable: string = '';

  constructor(private profileService: ProfileService, private toast: MessageService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef,
    private confirmationService: ConfirmationService, private fileExporter: FileExporterService) {
  }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.getProfiles();
  }
  getProfiles(): void {
    this.tableOptions.loading = true;

    this.profileService.getAll().subscribe({
      next: (res) => {
        this.listProfile = res;
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
    this.getProfiles();
  }
  addEdit(action: string): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditProfileComponent, {
        header: `Add profile`,
        style: { width: '90%', maxWidth: '500px' }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getProfiles();
      });
    }
    else if (this.selectedProfile?.id) {
      this.modalAddEdit = this.modalService.open(AddEditProfileComponent, {
        header: `Edit profile`,
        style: { width: '90%', maxWidth: '500px' },
        data: {
          idProfile: this.selectedProfile.id
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.getProfiles();
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
    this.fileExporter.exportExcel(this.listProfile.map(Profile => {
      let appr: any = { ...Profile };
      appr['Value'] = Profile.valueId;
      appr['State'] = Profile.isActive;
      delete appr['valueId'];
      delete appr['isActive'];
      return appr;
    }), 'Profile').finally(() => this.tableOptions.exportLoading = false);
  }
  delete(): void {
    if (this.selectedProfile?.id) {
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
          this.profileService.deleteProfile(this.selectedProfile?.id || 0).subscribe({
            next: () => {
              this.toast.add({ severity: 'success', summary: "Profile deleted successfuly" });
              this.getProfiles();
              this.selectedProfile = null;
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
