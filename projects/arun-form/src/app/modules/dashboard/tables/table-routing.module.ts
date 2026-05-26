import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddNewTableComponent } from './add-new-table/add-new-table.component';
import { AllTablesComponent } from './all-tables/all-tables.component';
import { AddTableValueComponent } from './add-table-value/add-table-value.component';
import { AllColumnValueComponent } from './all-column-value/all-column-value.component';

const routes: Routes = [
  { path: 'tables', component: AllTablesComponent },
//   { path: 'table-view', component: AddNewTableComponent },
//   { path: 'table-view/:id', component: AddNewTableComponent },
  { path: 'add-table-value', component: AddTableValueComponent },

    { path: 'edit-table-value/:id', component: AddTableValueComponent },


  { path: 'all-column-values', component: AllColumnValueComponent },

  // TODO : MOVE OUT TO SEPARATE MODULE
//   { path: 'create', component: AddNewTableComponent },
//   { path: 'edit-table/:id', component: AddNewTableComponent },
  { path: '', redirectTo: 'all-tables', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
