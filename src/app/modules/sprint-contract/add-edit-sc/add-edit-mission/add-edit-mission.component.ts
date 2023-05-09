import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@modules/shared/shared.module';
import { FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule} from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
  standalone: true,
  selector: 'app-add-edit-mission',
  templateUrl: './add-edit-mission.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    TabViewModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    SharedModule,
    FileUploadModule,
    HttpClientModule,
    CheckboxModule,
    TreeTableModule
  ]
})
export class AddEditMissionComponent implements OnInit {

  isSubmited: boolean = false;
  actionLoading: boolean = false;
  addEditForm!: FormGroup;
  files:any[]=[];
  cols:any[]=[];
  data:any;
  action:any;
  waitTime:any[]=[];
  colsTravel: any[]=[];
  travel: TreeNode[]= [
    {
      data: { id: '1', travelMission: 'Travel'},
      children: [
        {
          data: { id: '2', travelMission: 'Train ticket', costs: '0.00'}
        },
        { 
          data: { id: '3', travelMission: 'Plane Ticket', costs: '0.00'} 
        },
        {
          data: { id: '4', travelMission: 'Public transport outward trip (Brussels)', costs: '0.00'}
        },
        { 
          data: { id: '5', travelMission: 'Public transport outward trip (Abroad)', costs: '0.00'} 
        },
        {
          data: { id: '6', travelMission: 'Public transport return journey (Brussels)', costs: '0.00'}
        },
        { 
          data: { id: '7', travelMission: 'Public transport return journey (Abroad)', costs: '0.00'} 
        }
      ]
    },
    {
      data: { id: '8', travelMission: 'Mission'},
      children: [
        {
          data: { id: '9', travelMission: 'Number of nights', costs: '2.00'}
        },
        { 
          data: { id: '10', travelMission: 'Daily hotel cost', costs: '100.00'} 
        },
        {
          data: { id: '11', travelMission: 'Maximum hotel cost', costs: '200.00'}
        },
        { 
          data: { id: '12', travelMission: 'Real total hotel cost', costs: '200.00'} 
        },
        {
          data: { id: '13', travelMission: 'Daily allowance amount', costs: '0.00'}
        },
        { 
          data: { id: '14', travelMission: 'Total daily allowance', costs: '0.00'} 
        },
        {
          data: { id: '15', travelMission: 'Amount breakfast', costs: '0.00'}
        },
        { 
          data: { id: '16', travelMission: 'Amount lunch', costs: '0.00'} 
        },
        {
          data: { id: '17', travelMission: 'Amount dinner', costs: '0.00'}
        },
        { 
          data: { id: '18', travelMission: 'Total allowance', costs: '0.00'} 
        }
      ]
    },
    {
      data: { id: '19', travelMission: 'Extra cost'},
      children: [
        {
          data: { id: '20', travelMission: 'Total extra cost', costs: '0.00'}
        }
      ]
    }    
  ];
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig,private toast: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.data = this.config.data?.data;
    this.action = this.config.data?.action;
    if(this.action=='add'){
      this.initForm(null);
    }
    this.initForm(this.data);
    this.cols = [
      { field: 'fileName', header: 'File name' },
    ];

    this.travel.forEach(x => this.expandChildren(x));
    this.colsTravel = [
      { field: 'travelMission', header: '' },
      { field: 'costs', header: '' },
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

  initForm(data:any | null):void {
    this.addEditForm = new FormGroup({
      name : new FormControl({value:data ? data.consultantName.split(' ')[0] : null, disabled: true}),
      surname : new FormControl({value:data ? data.consultantName.split(' ')[1] : null, disabled: true}),
      projectName : new FormControl(data ? data.projectName : null),
      profile : new FormControl({value:data ? data.profile : null, disabled: true},[Validators.required]),
      authorizedBy : new FormControl(data ? data.authorizedBy : null),
      function : new FormControl(data ? data.function : null),
      fwcReference : new FormControl({value:data ? data.fwcReference : null, disabled: true}),
      specificContractReference : new FormControl({value:data ? data.specificContractReference : null, disabled: true}),
      goalOfTheMission : new FormControl(data ? data.goalOfTheMission : null),
      country : new FormControl(data ? data.country : null),
      city : new FormControl(data ? data.city : null),
      exchangeApplied : new FormControl(data ? data.exchangeApplied : false),
      exchangeRate : new FormControl({value:data ? data.exchangeRate : null, disabled: true}),
      source : new FormControl({value:data ? data.source : null, disabled: true}),
      departedOfOutwardJourney : new FormControl(data ? data.departedOfOutwardJourney : null,[Validators.required]),
      arrivalOfOutwardJourney : new FormControl(data ? data.arrivalOfOutwardJourney : null),
      commencementOfServicesRendered : new FormControl(data ? data.commencementOfServicesRendered : null),
      cessationOfServicesRendered : new FormControl(data ? data.cessationOfServicesRendered : null),
      departedOfReturnJourney : new FormControl(data ? data.departedOfReturnJourney : null),
      arrivalOfReturnJourney : new FormControl(data ? data.arrivalOfReturnJourney : null),
      durationOfTravel : new FormControl({value:data ? data.durationOfTravel : null, disabled: true}),
      waitTime : new FormControl(data ? data.waitTime : null,[Validators.required]),
      totalDurationOfTravel : new FormControl({value:data ? data.totalDurationOfTravel : null, disabled: true}),
      dailyAllowanceDays : new FormControl(data ? data.dailyAllowanceDays : null,[Validators.required]),
      totalAmountMission : new FormControl({value:data ? data.totalAmountMission : null, disabled: true}),
      grandTotal : new FormControl({value:data ? data.grandTotal : null, disabled: true}),

    });
  }

  onSubmit(){
    this.isSubmited = true;
    if (this.addEditForm.valid) {
      this.actionLoading = true;
      this.close();
    }
  }

  close(){
    this.ref.close();
  }

  importMission():void{

  }

  edit(file:any){
    this.toast.add({ severity: 'info', summary: "Edit file", detail: file});
  }

  delete(file:any){
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
        this.toast.add({ severity: 'info', summary: "Delete file", detail: file });
      },
  
    });
  }

}
