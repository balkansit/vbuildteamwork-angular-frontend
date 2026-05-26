import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRolesComponent } from './all-roles/all-roles.component';
import { AllUserComponent } from './all-user/all-user.component';
import { AddRolePremissionComponent } from './add-role-premission/add-role-premission.component';

const routes: Routes = [
  { path: 'role', component: AllRolesComponent },
  { path: 'user', component: AllUserComponent },
  { path: 'add-role-permission', component: AddRolePremissionComponent },
  { path: 'edit-role/:id', component: AddRolePremissionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
