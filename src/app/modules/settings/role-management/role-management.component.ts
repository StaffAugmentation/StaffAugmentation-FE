import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { TreeTable} from 'primeng/treetable';
import { AddEditRoleManagementComponent } from './add-edit-role-management/add-edit-role-management.component';
import { DialogService, DynamicDialogRef , DynamicDialogModule} from 'primeng/dynamicdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  standalone: true,
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TreeTableModule,
    DynamicDialogModule,
    ToggleButtonModule
  ]
})
export class RoleManagementComponent implements OnInit {

  constructor(private toast: MessageService,private confirmationService: ConfirmationService,
    private modalService: DialogService, private modalAddEdit: DynamicDialogRef) {}

  roles:any[]=[];
  cols: any[]=[];
  selectedRoles: any;
  selectedModels: any;
  searchTable: string = '';
  searchTableModel: string = '';
  colsModel: any[]=[];
  models: TreeNode[]= [
    {
      data: { id: '1', modulesPermissions: 'Business requests'},
      children: [
        {
          data: { id: '2', modulesPermissions: 'Add'}
        },
        { 
          data: { id: '3', modulesPermissions: 'Update'} 
        },
        {
          data: { id: '4', modulesPermissions: 'Remove'}
        },
        { 
          data: { id: '5', modulesPermissions: 'History'} 
        },
        { 
          data: { id: '6', modulesPermissions: 'Import from Excel'} 
        },
        {
          data: { id: '7', modulesPermissions: 'Refresh'}
        },
        { 
          data: { id: '8', modulesPermissions: 'Export to Excel'} 
        },
        { 
          data: { id: '9', modulesPermissions: 'Share'} 
        },
      ]
    }
  ];
  
  ngOnInit(): void {
    this.roles=[
      { id:1, roleName:'Super user' },
      { id:2, roleName:'User' },
      { id:3, roleName:'Consultation' },
      { id:4, roleName:'User-Recruitment' },
      { id:5, roleName:'Finance' },
    ],

    this.cols = [
      { field: 'roleName', header: 'Role' },
    ];

    this.models.forEach(x => this.expandChildren(x));

    this.colsModel = [
      { field: 'modulesPermissions', header: 'Modules & permissions' },
    ];
  }

  onRowSelect(event:any) {
    this.toast.add({ severity: 'info', summary: 'Role Selected', detail: event.data.roleName });
  }

  onRowUnselect(event:any) {
    this.toast.add({ severity: 'warn', summary: 'Role Unselected', detail: event.data.roleName });
  }

  nodeSelect(event:any) {
    this.toast.add({ severity: 'info', summary: 'Model Selected', detail: event.node.data.modulesPermissions });
  }

  nodeUnselect(event:any) {
      this.toast.add({ severity: 'warn', summary: 'Model Unselected', detail: event.node.data.modulesPermissions });
  }

  onGlobalFilter(table: Table | TreeTable,type:string): void {
    table.filterGlobal(type=='model'? this.searchTableModel : this.searchTable, 'contains');
  }

  get globalFilterFields(): string[] {
    return this.cols.map((col: any) => col.field);
  }
  
  get globalFilterFieldsModel(): string[] {
    return this.colsModel.map((col: any) => col.field);
  }

  addEdit(action: string,role:any): void {
    if (action == 'add') {
      this.modalAddEdit = this.modalService.open(AddEditRoleManagementComponent, {
        header: `Add`,
        style: { width: '85%', maxWidth: '500px'}
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.ngOnInit();
      });
    }
    else if (role) {
      this.modalAddEdit = this.modalService.open(AddEditRoleManagementComponent, {
        header: `Edit`,
        style: { width: '85%', maxWidth: '500px'},
        data: { role: role}
      });
      this.modalAddEdit.onClose.subscribe(res => {
        this.ngOnInit();
      });
    }
    else {
      this.toast.add({ severity: 'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
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
  expandChildren(node:TreeNode){
    if(node.children){
      node.expanded=true;
      for(let cn of node.children){
        this.expandChildren(cn);
      }
    }
  }
}
