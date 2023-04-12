import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrRoutingModule } from './br-routing.module';
import { BrComponent } from './br.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { Dropdown } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    BrComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrRoutingModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    OverlayPanelModule,
    CardModule,
    DropdownModule,
    AutoCompleteModule
  ]
})
export class BrModule { }
