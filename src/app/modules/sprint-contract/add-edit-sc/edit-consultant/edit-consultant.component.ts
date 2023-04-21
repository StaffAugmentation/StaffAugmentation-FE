import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { FormGroup, FormControl} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '@modules/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-edit-consultant',
  templateUrl: './edit-consultant.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    TabViewModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class EditConsultantComponent implements OnInit {

  consultant:any;
  editForm!: FormGroup;
  isSubmited: boolean = false;

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.consultant = this.config.data?.consultant;
    this.initForm(this.consultant);
  }

  close():void{
    this.ref.close();
 
  }

  initForm(data:any):void {
    this.editForm = new FormGroup({
      profile : new FormControl(data.profile),
      level: new FormControl(data.level),
      category: new FormControl(data.category),
      farSite: new FormControl(data.farSite),
      nOfDays : new FormControl(data.nOfDays),
      daysPerformed: new FormControl(data.daysPerformed),
      remainingDays: new FormControl(data.remainingDays),
      margin: new FormControl(data.margin),
      company : new FormControl(data.company),
      consultantCost: new FormControl(data.consultantCost),
      salesPrice: new FormControl(data.salesPrice),
      consultantContractStatus: new FormControl(data.consultantContractStatus),
      penalty: new FormControl(data.penalty), 
      penaltyDays: new FormControl(data.penaltyDays), 
      penaltyComment: new FormControl(data.penaltyComment),
      subcontractorName: new FormControl(data.subcontractorName), 
      thirdPartyRate: new FormControl(data.thirdPartyRate),
      daysOfTraining: new FormControl(data.daysOfTraining),
      daysForProvision: new FormControl(data.daysForProvision),
      renaimingDaysForProvision: new FormControl(data.renaimingDaysForProvision),
      budgetForProvision: new FormControl(data.budgetForProvision),
      remainingAmountForProvision: new FormControl(data.remainingAmountForProvision)
    });
  }

}
