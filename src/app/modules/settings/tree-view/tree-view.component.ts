import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  standalone: true,
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  imports: [
    TreeTableModule,
    ButtonModule,
    CommonModule
  ]
})

export class TreeViewComponent implements OnInit {
  
  cols: any[]=[];
  files: TreeNode[]= [
    {
      data: { id: '1', invoicingPeriod: '01/02/2023 - 28/02/2023', totalAmount: '955.00 CHF', oerpInvoiceCode:' ', invoiceDate:'07/04/2023', 
        invoiceComment:'Framework Contract: WIPO Specific Contract : WIPO1_0000123002', typeInvoice:'Client invoice' },
      children: [
        {
          data: { id: '2', invoicingPeriod: '01/02/2023 - 28/02/2023', totalAmount: '-95.50 CHF', oerpInvoiceCode:' ', invoiceDate:'07/04/2023', 
            invoiceComment:'Credit note of ss', typeInvoice:'Credit note' }
        },
        { data: { id: '3', invoicingPeriod: '01/02/2023 - 28/02/2023', totalAmount: '-191.00 CHF', oerpInvoiceCode:' ', invoiceDate:'07/04/2023', 
            invoiceComment:'Credit note of ss', typeInvoice:'Credit note' } }
      ]
    },
    {
      data: { id: '4', invoicingPeriod: '01/01/2023 - 31/01/2023', totalAmount: '0.00 CHF', oerpInvoiceCode:' ', invoiceDate:'07/04/2023', 
        invoiceComment:'Framework Contract: WIPO Specific Contract : WIPO1_0000123002', typeInvoice:'Client invoice' }
    }
  ];

  constructor(private toast: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.files.forEach(x => this.expandChildren(x));
    this.cols = [
      { field: 'invoicingPeriod', header: 'Invoicing period' },
      { field: 'totalAmount', header: 'Total amount' },
      { field: 'oerpInvoiceCode', header: 'OERP invoice code' },
      { field: 'invoiceDate', header: 'Invoice date' },
      { field: 'invoiceComment', header: 'Invoice comment' },
      { field: 'typeInvoice', header: 'Type invoice' }
    ];
  }

  expandChildren(node:TreeNode){
    if(node.children){
      node.expanded=true;
      for(let cn of node.children){
        this.expandChildren(cn);
      }
    }
  }

  onRowDoubleClick(rowData:any) {
    this.toast.add({ severity: 'success', summary: "Update row where id: "+rowData.id });
  }

  edit(id:number){
    this.toast.add({ severity: 'success', summary: "Update row where id: "+id });
  }

  delete(id:number){
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
        this.toast.add({ severity: 'success', summary: "Delete row where id: "+id });
      },
  
    });
  }
}
       