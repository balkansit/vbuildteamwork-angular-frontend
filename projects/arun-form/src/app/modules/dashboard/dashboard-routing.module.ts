import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { DayClosingsComponent } from './day-closings/day-closings.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from '@lib/core/guards/auth.guard';
import { DynamicTablesModule } from './dynamic-tables/dynamic-tables.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'day-closings', component: DayClosingsComponent },
      { path: 'reports', component: ReportsComponent },

      {
        path: 'dynamic-tables',
        loadChildren: () =>
          import('./dynamic-tables/dynamic-tables.module').then(
            (m) => m.DynamicTablesModule
          ),
      },

      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule),
      },

      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },

      {
        path: 'support-help',
        loadChildren: () =>
          import('./support-help/support-help.module').then(
            (m) => m.SupportHelpModule
          ),
      },

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
