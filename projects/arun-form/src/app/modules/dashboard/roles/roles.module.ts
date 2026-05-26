import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { AllRolesComponent } from './all-roles/all-roles.component';
import { AllUserComponent } from './all-user/all-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@lib/components/components.module';
import { FeaturesModule } from '@lib/features/features.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddRolePremissionComponent } from './add-role-premission/add-role-premission.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AllRolesComponent,
    AllUserComponent,
    AddRolePremissionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,  
    RolesRoutingModule,
    ComponentsModule,
    MatIconModule,
    FeaturesModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ComponentsModule,
    FeaturesModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatChipsModule
  ],
})
export class RolesModule {}
