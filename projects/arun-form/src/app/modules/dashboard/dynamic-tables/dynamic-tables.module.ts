import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@lib/components/components.module';
import { FeaturesModule } from '@lib/features/features.module';
import { DynamicTablesRoutingModule } from './dynamic-tables-routing.module';

import { MainTableComponent } from './main-table/main-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMainTableComponent } from './add-main-table/add-main-table.component';
import { ReopenDayModalComponent } from '../dynamic-tables/main-table/reopen-day-modal/reopen-day-modal.component';
import { CloseDayModalComponent } from '../dynamic-tables/main-table/close-day-modal/close-day-modal.component';

@NgModule({
  declarations: [
    MainTableComponent,
    AddMainTableComponent,
    ReopenDayModalComponent,
    CloseDayModalComponent,
  ],
  imports: [
    CommonModule,
    DynamicTablesRoutingModule,
    ComponentsModule,
    FeaturesModule,
    FormsModule, // ✅ Optional but good to include
    ReactiveFormsModule, // ✅ Needed for [formGroup], formArrayName, etc.
  ],
})
// Re-compiled to detect new BaseTableComponent inputs
export class DynamicTablesModule {}
