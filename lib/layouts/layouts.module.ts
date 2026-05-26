import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ToggleSidebarLayoutComponent } from './sidebar/toggle-sidebar-layout/toggle-sidebar-layout.component';
import { FeaturesModule } from '../features/features.module';
import { ProductDetailLayoutComponent } from './ecommerce/product-detail-layout/product-detail-layout.component';
import { SidebarFullLayoutComponent } from './sidebar/sidebar-full-layout/sidebar-full-layout.component';
import { AuthLayoutComponent } from './auth-layouts/auth-layout/auth-layout.component';
import { ModalWrapperComponent } from './wrappers/modal-wrapper/modal-wrapper.component';
import { ComponentsModule } from '@lib/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';

import { InvoiceLayoutComponent } from './invoice-layout/invoice-layout/invoice-layout.component';

import { SidebarFullLayoutArunFormComponent } from './sidebar/sidebar-full-layout-arun-form/sidebar-full-layout-arun-form';



@NgModule({
  declarations: [
    ToggleSidebarLayoutComponent,
    ProductDetailLayoutComponent,
    SidebarFullLayoutComponent,
    AuthLayoutComponent,
    ModalWrapperComponent,
    InvoiceLayoutComponent,
    SidebarFullLayoutArunFormComponent,

  ],
  imports: [
    CommonModule,
    NgIf,
    FeaturesModule,
    ComponentsModule,
    MatDialogModule,
  ],
  exports: [
    ToggleSidebarLayoutComponent,
    ProductDetailLayoutComponent,
    SidebarFullLayoutComponent,
    InvoiceLayoutComponent,
    AuthLayoutComponent,
    ModalWrapperComponent,
    SidebarFullLayoutArunFormComponent,
  
  ],
})
export class LayoutsModule { }
