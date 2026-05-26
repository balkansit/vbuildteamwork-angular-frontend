import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { ComponentsModule } from '@lib/components/components.module';
import { HasRoleDirective } from '@lib/core/auth/has-role.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoleListComponent,
    RoleFormComponent,
    UserListComponent,
    PermissionListComponent,
    RolePermissionComponent,
  ],
  imports: [CommonModule, ComponentsModule, HasRoleDirective, FormsModule],
  exports: [
    RoleListComponent,
    RoleFormComponent,
    UserListComponent,
    PermissionListComponent,
    RolePermissionComponent,
    HasRoleDirective,
    ComponentsModule,
  ],
})
export class RbacFeatureModule {}
