import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalDirective } from '@directives/decimal.directive';


@NgModule({
  declarations: [
    DecimalDirective
  ],
  imports: [
    CommonModule    
  ],
  exports: [
    CommonModule,
    DecimalDirective
  ]
})
export class SharedModule { }
