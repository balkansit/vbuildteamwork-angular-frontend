import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { BaseTableComponent } from '@lib/components/tables/base-table/base-table.component';
import {
  getPermissionViewFields,
  Permission,
  permissionTableColumns,
} from 'projects/arun-form/src/app/models/dbschema/permissions.model';
import { Role } from 'projects/arun-form/src/app/models/dbschema/roles.model';
import { PermissionService } from 'projects/arun-form/src/app/services/apis/permission.service';
import { RoleService } from 'projects/arun-form/src/app/services/apis/role.service';
import { RolePermissionService } from 'projects/arun-form/src/app/services/apis/rolePermission.service';

@Component({
  selector: 'app-add-role-premission',
  standalone: false,
  templateUrl: './add-role-premission.component.html',
  styleUrls: ['./add-role-premission.component.css'],
})
export class AddRolePremissionComponent implements OnInit {
  // ----------------------------- Properties -----------------------------
    allPermissions: Permission[] = [];
    selectedPermissionIds: Set<number> = new Set();
    selectedPermissions: { id: number, name: string }[] = [];
  
    roles: Role[] = [];
    dropdownRoleOptions: { label: string, value: any }[] = [];
    selectedRoleId: number | null = null;
    id: number | null = null;
  
    tableColumns = permissionTableColumns;
    whoCanEditDelete = ['admin', 'super_admin'];
  
    filterColumns = [
      { key: 'id', label: 'ID', filterable: true, type: 'input' },
      { key: 'name', label: 'Name', filterable: true, type: 'input' },
      { key: 'label', label: 'Label', filterable: true, type: 'input' },
    
    ];
  
    @ViewChild(BaseTableComponent) permissionTable!: BaseTableComponent<any>;
  
    // ----------------------------- Constructor -----------------------------
    constructor(
      private roleService: RoleService,
      private permissionService: PermissionService,
      private rolePermissionService: RolePermissionService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    // ----------------------------- Initialization -----------------------------
    ngOnInit() {
      // Get role ID from route (edit mode)
      this.id = Number(this.route.snapshot.paramMap.get('id'));
  
      // Load dropdown roles & all permissions
      this.loadRoles();
      this.loadAllPermissions();
  
      // Load existing permissions for editing
      if (this.id) {
        this.loadRolePermissions(this.id);
        this.selectedRoleId = this.id;
      }
    }
  
    // ----------------------------- Detect Table Checkbox Changes -----------------------------
    ngDoCheck() {
      if (!this.permissionTable || !this.allPermissions.length) return;
  
      const newSelectedIds = new Set(this.permissionTable.selectedItems);
      let changed = false;
  
      // Detect changes
      if (
        this.selectedPermissionIds.size !== newSelectedIds.size ||
        Array.from(this.selectedPermissionIds).some(id => !newSelectedIds.has(id))
      ) {
        changed = true;
      }
  
      if (changed) {
        this.selectedPermissionIds = newSelectedIds;
        this.updateSelectedPermissions();
      }
    }
  
    // ----------------------------- Load Roles -----------------------------
    loadRoles() {
      this.roleService.getAll().subscribe({
        next: (res: ApiResponse) => {
          if (res.success && res.data) {
            this.roles = res.data;
            this.dropdownRoleOptions = this.roles.map(role => ({
              label: role.name,
              value: role.id
            }));
  
            if (this.id) this.selectedRoleId = this.id;
          }
        },
        error: err => console.error('Error fetching roles:', err)
      });
    }
  
    // ----------------------------- Load Permissions -----------------------------
    loadAllPermissions() {
      this.permissionService.getAll().subscribe((res: ApiResponse) => {
        if (res.success && res.data) {
          this.allPermissions = res.data;
        }
      });
    }
  
    // ----------------------------- Load Role Permissions (Edit Mode) -----------------------------
    loadRolePermissions(id: number) {
      this.rolePermissionService.getById(id).subscribe({
        next: (res: ApiResponse) => {
          if (res.success && res.data) {
            const assignedPermissionIds = res.data.map((p: any) => p.id);
            this.permissionTable.selectedItems = new Set(assignedPermissionIds);
            this.updateSelectedPermissions();
          }
        },
        error: err => console.error('Error fetching role permissions:', err)
      });
    }
  
    // ----------------------------- BaseTable Methods -----------------------------
    fetchPermissions = () => this.permissionService.getAll();
    getViewFields = getPermissionViewFields;
    updatePermission = (id: number, data: any) => this.permissionService.update(id, data);
    deletePermission = (id: number) => this.permissionService.delete(id);
  
    // ----------------------------- Dropdown Selection -----------------------------
    onDropdownValueChange(roleId: number) {
      this.selectedRoleId = roleId;
    }
  
    // ----------------------------- Chips Sync -----------------------------
    updateSelectedPermissions() {
      this.selectedPermissions = this.allPermissions
        .filter(p => this.selectedPermissionIds.has(p.id))
        .map(p => ({ id: p.id, name: p.name }));
    }
  
    removePermissionChip(permission: { id: number; name: string }) {
      // Remove from local Set
      this.selectedPermissionIds.delete(permission.id);
  
      // Update chips
      this.updateSelectedPermissions();
  
      // Remove from BaseTable checkbox selection
      if (this.permissionTable && this.permissionTable.selectedItems.has(permission.id)) {
        this.permissionTable.selectedItems.delete(permission.id);
        // Force Angular to detect change
        this.permissionTable.selectedItems = new Set(this.permissionTable.selectedItems);
      }
    }
  
    // ----------------------------- Submit -----------------------------
    onSubmit() {
      if (!this.selectedRoleId) {
        alert('Please select a role');
        return;
      }
  
      const selectedPermissionIds = Array.from(this.permissionTable.selectedItems);
  
      if (this.id) {
        // Update existing role permissions
        this.rolePermissionService.updatePermissions(this.id, selectedPermissionIds)
          .subscribe({
            next: (res: ApiResponse) => {
              if (res.success) {
                this.router.navigate(['/dashboard/roles/role']);
              } else {
                console.error('Failed to update permissions:', res.message);
              }
            },
            error: err => console.error('Error updating permissions:', err)
          });
      } else {
        // Create new role permissions
        this.rolePermissionService.createPermissions(this.selectedRoleId, selectedPermissionIds)
          .subscribe({
            next: (res: ApiResponse) => {
              if (res.success) {        
                this.router.navigate(['/dashboard/roles/role']);
              } else {
                console.error('Failed to create permissions:', res.message);
              }
            },
            error: err => console.error('Error creating permissions:', err)
          });
      }
    }
}
