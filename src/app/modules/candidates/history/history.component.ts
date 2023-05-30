import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    MessageModule,
    TabViewModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
  ]
})
export class HistoryComponent implements OnInit {

  consultant: any[] = [];
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'consultantName', label: 'Consultant name' },
      { id: 'resourcePhone', label: 'Resource phone' },
      { id: 'resourceEmail', label: 'Resource email' },
      { id: 'idNumber', label: 'ID Number' },
      { id: 'nationality', label: 'Nationality' },
      { id: 'legalEntityName', label: 'Legal entity name' },
      { id: 'vatNumber', label: 'VAT Number' },
      { id: 'earliestStartDate', label: 'Earliest start date' },
      { id: 'birthdate', label: 'Birthdate' },
      { id: 'cost', label: 'Cost' },
      { id: 'thirdPartyRate', label: 'Third party rate' },
      { id: 'companyRegistrationNumber', label: 'Company registration number' },
      { id: 'riskOfDeparture', label: 'Risk of departure' },
      { id: 'riskOfDepartureComment', label: 'Risk of departure comment' },
      { id: 'plannedLeaveDate', label: 'Planned leave date' },
      { id: 'paymentTerms', label: 'Payment terms' },
      { id: 'legalEntityAddress', label: 'Legal entity address' },
      { id: 'typeOfContract', label: 'Type of contract' },
      { id: 'projectCode', label: 'Project code' },
      { id: 'vat', label: 'VAT' },
      { id: 'ibanNumber', label: 'IBAN Number' },
      { id: 'bic/swift', label: 'BIC/SWIFT'},
      { id: 'approver', label: 'Approver' },
      { id: 'clientProjectManager', label: 'Client project manager' },
      { id: 'clientProjectManagerContact', label: 'Client project manager contact' },
      { id: 'sapVendor', label: 'SAP Vendor' },
      { id: 'employeeNumber', label: 'Employee number' },
      { id: 'action', label: 'Action' },
      { id: 'updatedBy', label: 'Updated by' },
      { id: 'dateUpdate', label: 'Date update' },
    ],
    loading: false,
    exportLoading: false
  };
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
    this.consultant = [this.config.data?.consultant];
  }

  close(): void {
    this.ref.close();
  }
}
