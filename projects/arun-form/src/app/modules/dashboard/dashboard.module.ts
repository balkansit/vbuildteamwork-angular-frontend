import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { DayClosingsComponent } from './day-closings/day-closings.component';
import { ReportsComponent } from './reports/reports.component';
import { NgChartsModule } from 'ng2-charts';
import { LayoutsModule } from '@lib/layouts/layouts.module';
import { FeaturesModule } from '@lib/features/features.module';
import { ComponentsModule } from '@lib/components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, OverviewComponent, DayClosingsComponent, ReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgChartsModule,
    LayoutsModule,
    FeaturesModule,
    ComponentsModule,
  ],
})
export class DashboardModule {}
