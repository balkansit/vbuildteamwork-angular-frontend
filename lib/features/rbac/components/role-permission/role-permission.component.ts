import { Component, OnInit } from '@angular/core';
import { RolePermissionService } from '../../services/role-permission.service';
import {
  PermissionService,
  Permission,
} from '../../services/permission.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

interface PermissionModuleGroup {
  module: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-shared-role-permission',
  standalone: false,
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css'],
})
export class RolePermissionComponent implements OnInit {
  roles: Role[] = [];
  roleSearchTerm = '';
  rolesLoading = false;
  selectedRole: Role | null = null;

  allPermissions: Permission[] = [];
  permissionModules: PermissionModuleGroup[] = [];
  assignedPermissionIds = new Set<number>();

  permissionsLoading = false;
  saving = false;
  errorMessage = '';

  constructor(
    private rolePermissionService: RolePermissionService,
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    this.searchRoles();
  }

  searchRoles(term: string = ''): void {
    this.rolesLoading = true;
    this.roleService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        // Apply local filtering if term is provided, or backend could handle it
        const list = Array.isArray(data) ? data : [];
        if (term) {
          this.roles = list.filter((r: Role) =>
            r.name.toLowerCase().includes(term.toLowerCase())
          );
        } else {
          this.roles = list;
        }
        this.rolesLoading = false;
      },
      error: () => {
        this.rolesLoading = false;
      },
    });
  }

  loadPermissions(): void {
    this.permissionsLoading = true;
    this.permissionService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.allPermissions = Array.isArray(data) ? data : [];
        this.buildPermissionModules();
        this.permissionsLoading = false;
      },
      error: () => {
        this.permissionsLoading = false;
      },
    });
  }

  buildPermissionModules(): void {
    const grouped = new Map<string, Permission[]>();
    this.allPermissions.forEach((perm: any) => {
      const key = perm.module || 'General';
      const existing = grouped.get(key) || [];
      grouped.set(key, [...existing, perm]);
    });
    this.permissionModules = Array.from(grouped.entries()).map(
      ([module, permissions]) => ({
        module,
        permissions,
      })
    );
  }

  selectRole(role: Role): void {
    if (this.selectedRole?.id === role.id) return;
    this.selectedRole = role;
    this.loadRolePermissions(role.id);
  }

  loadRolePermissions(roleId: number): void {
    this.permissionsLoading = true;
    this.rolePermissionService.getByRole(roleId).subscribe({
      next: (res: any) => {
        const data = res?.data ?? [];
        const ids = Array.isArray(data)
          ? data.map((rp: any) => rp.permission_id)
          : [];
        this.assignedPermissionIds = new Set(ids);
        this.permissionsLoading = false;
      },
      error: () => {
        this.permissionsLoading = false;
      },
    });
  }

  isPermissionSelected(id: number): boolean {
    return this.assignedPermissionIds.has(id);
  }

  togglePermission(id: number): void {
    if (this.assignedPermissionIds.has(id)) {
      this.assignedPermissionIds.delete(id);
    } else {
      this.assignedPermissionIds.add(id);
    }
  }

  toggleModule(moduleName: string): void {
    const moduleGroup = this.permissionModules.find(
      (m) => m.module === moduleName
    );
    if (!moduleGroup) return;
    const allSelected = moduleGroup.permissions.every((p) =>
      this.assignedPermissionIds.has(p.id)
    );
    moduleGroup.permissions.forEach((p) => {
      if (allSelected) {
        this.assignedPermissionIds.delete(p.id);
      } else {
        this.assignedPermissionIds.add(p.id);
      }
    });
  }

  moduleSelectionState(moduleName: string): 'all' | 'some' | 'none' {
    const moduleGroup = this.permissionModules.find(
      (m) => m.module === moduleName
    );
    if (!moduleGroup) return 'none';
    const selectedCount = moduleGroup.permissions.filter((p) =>
      this.assignedPermissionIds.has(p.id)
    ).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === moduleGroup.permissions.length) return 'all';
    return 'some';
  }

  selectedCount(moduleGroup: PermissionModuleGroup): number {
    return moduleGroup.permissions.filter((p) =>
      this.assignedPermissionIds.has(p.id)
    ).length;
  }

  saveChanges(): void {
    if (!this.selectedRole) {
      this.errorMessage = 'Please select a role first.';
      return;
    }
    this.saving = true;
    const permissionIds = Array.from(this.assignedPermissionIds);
    this.rolePermissionService
      .updatePermissions(this.selectedRole.id, permissionIds)
      .subscribe({
        next: () => {
          this.saving = false;
        },
        error: () => {
          this.saving = false;
        },
      });
  }
}
