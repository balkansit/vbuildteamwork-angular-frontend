import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import { AllTablesComponent } from './all-tables/all-tables.component';
// import { AddNewTableComponent } from './add-new-table/add-new-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@lib/components/components.module';
import { FeaturesModule } from '@lib/features/features.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { LoyaltyProgramsComponent } from './loyalty-programs/loyalty-programs.component';
import { AddTableValueComponent } from './add-table-value/add-table-value.component';
import { AllColumnValueComponent } from './all-column-value/all-column-value.component';

@NgModule({
  declarations: [
    AllTablesComponent,
    // AddNewTableComponent,
    LoyaltyProgramsComponent,
    AddTableValueComponent,
    AllColumnValueComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    ComponentsModule,
    FeaturesModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
   
  ],
})
export class TablesModule { }
