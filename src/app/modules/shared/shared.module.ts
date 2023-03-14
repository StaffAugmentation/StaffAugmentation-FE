import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalDirective } from '@directives/decimal.directive';
import { NameOnlyDirective } from '@directives/name-only.directive';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    DecimalDirective,
    NameOnlyDirective
  ],
  imports: [
    CommonModule    
  ],
  exports: [
    CommonModule,
    DecimalDirective,
    NameOnlyDirective
  ]
})
export class SharedModule { }
