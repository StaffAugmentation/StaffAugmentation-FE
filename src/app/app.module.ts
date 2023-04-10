import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, DialogService, DynamicDialogRef, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
