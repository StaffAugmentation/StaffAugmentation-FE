import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditConsultantComponent } from './edit-consultant/edit-consultant.component';
import { ChangeCostComponent } from './change-cost/change-cost.component';
import { SharedModule } from '@modules/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { AddEditDaysWorkedComponent } from './add-edit-days-worked/add-edit-days-worked.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddProvisionComponent } from './add-provision/add-provision.component';
import { AddMonthComponent } from './add-month/add-month.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { GenerateNttDataContractComponent } from './generate-ntt-data-contract/generate-ntt-data-contract.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

@Component({
  standalone: true,
  selector: 'app-add-edit-sc',
  templateUrl: './add-edit-sc.component.html',
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
    InputTextareaModule,
    SplitButtonModule

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
export class AddEditScComponent implements OnInit {

  isCollapsed: any = {
    performance: true,
    general: true,
  };
  selectedSC: any
  addEditForm!: FormGroup;
  isSubmited: boolean = false;
  actionLoading: boolean = false;
  action!: string;
  invoice: any[] = [];
  processForPayment: any[] = [];
  purchaseOrder: any[] = [];
  cost: any[] = [];
  cols: any[] = [];
  colsConsultant: any[] = [];
  colsPerformance: any[] = [];
  colsPerformances: any[] = [];
  colsGeneral: any[] = [];
  selectedPerformances: any;
  selectedGenerals: any;
  general: any[] = [];
  invoices: any[] = [
    {id: '1', invoicingPeriod: '01/01/2023 - 28/02/2023', totalAmount: '5,391.84', oerpInvoiceCode: '5.000000', invoiceDate: '12/04/2023', invoiceComment: '  Framework Contract: DIGIT TM II LO T2 Specific .....', typeInvoice:'Client invoice' }
  ];
  colsInvoice: any[] = [];
  performance: TreeNode[] = [
    {
      data: { action: 'Anthony Puech [Project Manager;9;Near site' },
      children: [
        {
          data: { id: '2', month: 'January/2023', forecast: '6.000000', daysWorked: '5.000000', remainingDays: '140.000000', oerpProjectCode: 'EXT-012133-00167' }
        },
        {
          data: { id: '3', month: 'February/2023', forecast: '18.000000', daysWorked: '3.000000', remainingDays: '137.000000', oerpProjectCode: 'EXT-012133-00167' }
        },
        {
          data: { id: '4', month: 'March/2023', forecast: '18.000000', daysWorked: '0.000000', remainingDays: '137.000000', oerpProjectCode: 'EXT-012133-00167' }
        },
      ]
    }
  ];
  oerp: any[] = [
    { id: '1', oerpProjectCode: 'EXT-024662-00139' }
  ];
  consultant: any[] = [
    { id: '1', consultantName: 'Anthony Asanka', profileLeveOnsiteCategory: 'consultant ; Unique ; Far site', company: 'NTT data SWISS', nOfDays: '65.00' }
  ];

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig, private modalService: DialogService,
    private modalEdit: DynamicDialogRef, private toast: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.selectedSC = this.config.data?.springContract;
    this.action = this.config.data?.action;
    if (this.action == 'add') {
      this.initForm(null);
    }
    this.initForm(this.selectedSC);

    this.cols = [
      { field: 'oerpProjectCode', header: 'OERP project code' },
    ];

    this.colsConsultant = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'company', header: 'Company' },
      { field: 'nOfDays', header: 'N° of days' },
      { field: 'consultantCost', header: 'Consultant cost' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'margin', header: 'Margin' },
      { field: 'daysPerformed', header: 'Days performed' },
    ];

    this.invoice = [
      { label: 'Client invoice' },
      { label: 'Management fee invoice' }
    ];

    this.processForPayment = [
      { label: 'Consultant payment process' }
    ];

    this.purchaseOrder = [
      { label: 'Consultant PO' }
    ];

    this.colsPerformance = [
      { field: 'action', header: ' ' },
      { field: 'month', header: 'Month' },
      { field: 'forecast', header: 'Forecast' },
      { field: 'daysWorked', header: 'Days worked' },
      { field: 'remainingDays', header: 'Remaining days' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'company', header: 'Company' },
      { field: 'typeOfContract', header: 'Type of contract' },
      { field: 'consultantCost', header: 'Consultant cost' },
      { field: 'thirdPartyRate', header: 'Third party rate' },
      { field: 'noInvoiceableDays', header: 'No invoiceable days' },
      { field: 'noPayableDays', header: 'No payable days' },
      { field: 'paymentStatus', header: 'Payment status' },
      { field: 'thirdPartyPaymentStatus', header: 'Third party payment status' },
      { field: 'mfPaymentStatus', header: 'MF payment status' },
      { field: 'invoicingStatus', header: 'Invoicing status' },
      { field: 'mfInvoicingStatus', header: 'MF invoicing status' },
    ];

    this.performance.forEach(x => this.expandChildren(x));

    this.colsPerformances = [
      { field: 'action', header: ' ' },
      { field: 'month', header: 'Month' },
      { field: 'daysWorked', header: 'Days worked' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'remainingDays', header: 'Remaining days' },
      { field: 'company', header: 'Company' },
      { field: 'typeOfContract', header: 'Type of contract' },
      { field: 'salesPrice', header: 'Sales price' },
      { field: 'consultantCost', header: 'Consultant cost' },
      { field: 'thirdPartyRate', header: 'Third party rate' },
      { field: 'paymentStatus', header: 'Payment status' },
      { field: 'thirdPartyPaymentStatus', header: 'Third party payment status' },
      { field: 'mfPaymentStatus', header: 'MF payment status' },
      { field: 'invoicingStatus', header: 'Invoicing status' },
      { field: 'mfInvoicingStatus', header: 'MF invoicing status' },
    ];

    this.colsGeneral = [
      { field: 'consultantName', header: 'Consultant name' },
      { field: 'profileLeveOnsiteCategory', header: 'Profile/leve/onsite/category' },
      { field: 'description', header: 'Description' },
      { field: 'oerpProjectCode', header: 'OERP project code' },
      { field: 'amount', header: 'Amount' },
      { field: 'remainingAmount', header: 'Remaining amount' },
      { field: 'paymentStatus', header: 'Payment status' },
      { field: 'mfPaymentStatus', header: 'MF payment status' },
      { field: 'invoicingStatus', header: 'Invoicing status' },
      { field: 'mfInvoicingStatus', header: 'MF invoicing status' },
    ];

    this.colsInvoice = [
      { field: 'invoicingPeriod', header: 'Invoicing period' },
      { field: 'totalAmount', header: 'Total amount' },
      { field: 'oerpInvoiceCode', header: 'OERP invoice code' },
      { field: 'invoiceDate', header: 'Invoice date' },
      { field: 'invoiceComment', header: 'Invoice comment' },
      { field: 'typeInvoice', header: 'Type invoice' },
    ];
  }

  expandChildren(node: TreeNode) {
    if (node.children) {
      node.expanded = true;
      for (let cn of node.children) {
        this.expandChildren(cn);
      }
    }
  }

  onSubmit(): void {
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  initForm(data: any | null): void {
    this.addEditForm = new FormGroup({
      requestNumber: new FormControl(data ? data.requestNumber : '', [Validators.required]),
      requestOrExtension: new FormControl(data ? data.requestOrExtension : null),
      scNumber: new FormControl(data ? data.scNumber : null),
      department: new FormControl(data ? data.department : null),
      placeOfDelivery: new FormControl(data ? data.placeOfDelivery : null),
      frameworkContract: new FormControl(data ? data.frameworkContract : null),
      signatureDate: new FormControl(data ? data.signatureDate : null),
      maximumEndDate: new FormControl(data ? data.maximumEndDate : null),
      specificClientCode: new FormControl(data ? data.specificClientCode : null),
      projectStartDate: new FormControl(data ? data.projectStartDate : null),
      contractStatus: new FormControl(data ? data.contractStatus : null),
      totalPrice: new FormControl(data ? data.totalPrice : null),
      numberOfDays: new FormControl(data ? data.numberOfDays : null),
      nDaysTransformed: new FormControl(data ? data.nDaysTransformed : null),
      managementFee: new FormControl(data ? data.managementFee : null),
      oerpProjectCode: new FormControl(data ? data.oerpProjectCode : '', [Validators.required]),
      maximumCost: new FormControl(data ? data.maximumCost : null),
      additionalBudget: new FormControl(data ? data.additionalBudget : null),
      mfInvoiced: new FormControl(data ? data.mfInvoiced : false),
      purchaseOrder: new FormControl(data ? data.purchaseOrder :null),
      performanceComment: new FormControl(data ? data.performanceComment :null),
      remainingAmount: new FormControl({value:data ? data.remainingAmount :null,disabled:true}),

    });
  }

  businessRequest(): void {

  }

  terminateContract(): void {

  }
  generateNTTDataContract(): void {
    this.modalEdit = this.modalService.open(GenerateNttDataContractComponent, {
      header: 'NTT data contract details',
      style: { width: '90%', maxWidth: '800px' },
      data: {
        consultant: this.selectedSC,
        action: this.action
      }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  add(): void {

  }

  changeCost(): void {
    this.modalEdit = this.modalService.open(ChangeCostComponent, {
      header: 'Change consultant cost',
      style: { width: '90%', maxWidth: '800px' },
      data: { consultant: this.consultant }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });

  }

  close(): void {
    this.ref.close();
  }

  delete(oerp: any) {
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
        this.toast.add({ severity: 'info', summary: "Delete row", detail: oerp.oerpProjectCode });
      },

    });
  }

  editConsultant(consultant: any): void {
    this.modalEdit = this.modalService.open(EditConsultantComponent, {
      header: consultant.consultantName,
      style: { width: '80%', maxWidth: '1100px' },
      data: {
        consultant: consultant
      }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });

  }

  transformForExtraServices(): void {

  }

  generateTsTemplate(): void {

  }

  generateInvoice(): void {

  }

  processPayment(): void {

  }

  purchaseOrders(): void {

  }

  addEditDaysWorked(action: string, row: any): void {
    if (action == 'add') {
      this.modalEdit = this.modalService.open(AddEditDaysWorkedComponent, {
        header: 'Add days worked',
        width: '70%',
        height: '60%',
        data: {
          action: 'add'
        }
      });
      this.modalEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    } else {
      this.modalEdit = this.modalService.open(AddEditDaysWorkedComponent, {
        header: 'Edit days worked',
        width: '70%',
        height: '60%',
        data: {
          data: row
        }
      });
      this.modalEdit.onClose.subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  deleteDaysWorked(row: any) {
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
        this.toast.add({ severity: 'info', summary: "Delete row", detail: row.month });
      },

    });
  }

  addMonth(): void {
    this.modalEdit = this.modalService.open(AddMonthComponent, {
      header: 'Add days worked',
      width: '70%',
      height: '60%',
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  addLine(): void {
    this.modalEdit = this.modalService.open(AddProvisionComponent, {
      header: 'Add provision',
      width: '70%',
      height: '60%',
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  nodeSelect(event: any) {
    this.toast.add({ severity: 'info', summary: 'row Selected', detail: event.node.data.month });
  }

  nodeUnselect(event: any) {
    this.toast.add({ severity: 'warn', summary: 'row Unselected', detail: event.node.data.month });
  }

  edit(general: any): void {
    this.toast.add({ severity: 'info', summary: "Edit row", detail: general.consultantName });
  }

  deleteGeneral(general: any) {
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
        this.toast.add({ severity: 'info', summary: "Delete row", detail: general.consultantName });
      },

    });
  }

  editInvoice(invoice: any):void{
    this.modalEdit = this.modalService.open(EditInvoiceComponent, {
      header: invoice.typeInvoice,
      style: { width: '90%', maxWidth: '900px' },
      data: {
        invoice: invoice
      }
    });
    this.modalEdit.onClose.subscribe(() => {
      this.ngOnInit();
    });

  }
}
