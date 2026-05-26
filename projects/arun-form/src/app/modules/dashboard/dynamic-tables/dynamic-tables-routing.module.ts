import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './main-table/main-table.component';
import { AddMainTableComponent } from './add-main-table/add-main-table.component';

const routes: Routes = [
  {
    path: '',
    component: MainTableComponent,
  },


  {
    path: ':id',
    component: MainTableComponent,
  },
  {
    path: 'table-records/:id',
    component: AddMainTableComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicTablesRoutingModule { }
