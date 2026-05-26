import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebars/sidebar/sidebar.component';

import { ComponentsModule } from '../components/components.module';
import { InvoiceFormComponent } from './forms/invoice-form/invoice-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { AuthFormComponent } from './forms/auth-form/auth-form.component';
// DynamicFormComponent is exported from ComponentsModule
import { MedicalSidebarComponent } from './sidebars/medical-sidebar/medical-sidebar.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { PosFormComponent } from './forms/pos-form/pos-form.component';
import { GenericSelectorDialogComponent } from './dialogs/generic-selector-dialog/generic-selector-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BillingTableComponent } from './tables/billing-table/billing-table.component';
import { PaymentSummaryComponent } from './views/payment-summary/payment-summary.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatrimonySidebarComponent } from './sidebars/matrimony-sidebar/matrimony-sidebar.component';

import { HotelManagementSidebarComponent } from './sidebars/hotel-management-sidebar/hotel-management-sidebar.component';

import { PhotoUploaderComponent } from './photo-uploader/photo-uploader.component';
import { ArunFormSidebarComponent } from './sidebars/arun-form-sidebar/arun-form-sidebar.component';
import { ArunFormHeaderComponent } from './headers/arun-form-header/arun-form-header.component';
import { SingleSelectorDialogComponent } from './dialogs/single-selector-dialog/single-selector-dialog.component';
import { MultiSelectorDialogComponent } from './dialogs/multi-selector-dialog/multi-selector-dialog.component';
import { GenerateReportModalComponent } from './generate-report-modal/generate-report-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import { ShopSelectorBadgeComponent } from './shop-selector-badge/shop-selector-badge.component';
import { BitsSystemSidebarComponent } from './sidebars/bits-system-sidebar/bits-system-sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    InvoiceFormComponent,
    CreateFormComponent,
    AuthFormComponent,
    // DynamicFormComponent - exported from ComponentsModule
    MedicalSidebarComponent,

    PosFormComponent,
    ArunFormHeaderComponent,
    GenericSelectorDialogComponent,
    BillingTableComponent,
    PaymentSummaryComponent,
    MatrimonySidebarComponent,

    HotelManagementSidebarComponent,

    PhotoUploaderComponent,
    ArunFormSidebarComponent,
    SingleSelectorDialogComponent,
    MultiSelectorDialogComponent,
    GenerateReportModalComponent,

    ShopSelectorBadgeComponent,
    BitsSystemSidebarComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule,
  ],
exports: [
  SidebarComponent,
  InvoiceFormComponent,
  CreateFormComponent,
  AuthFormComponent,
  MedicalSidebarComponent,
  PosFormComponent,
  ArunFormSidebarComponent,
  ArunFormHeaderComponent,
  HotelManagementSidebarComponent,
  PhotoUploaderComponent,
  GenerateReportModalComponent,
  ShopSelectorBadgeComponent,
  BitsSystemSidebarComponent,
],
})
export class FeaturesModule {}
