import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { RoleService } from 'projects/arun-form/src/app/services/apis/role.service';
import { PermissionService } from 'projects/arun-form/src/app/services/apis/permission.service';
import { RolePermissionService } from 'projects/arun-form/src/app/services/apis/rolePermission.service';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';
import { DropdownValuesService } from 'projects/arun-form/src/app/services/apis/dropdown-values.service';
import { AuthService } from '@lib/services/auth/auth.service';
import { Permission } from 'projects/arun-form/src/app/models/dbschema/permissions.model';
import { Role } from 'projects/arun-form/src/app/models/dbschema/roles.model';

@Component({
  selector: 'app-add-table-value',
  standalone: false,
  templateUrl: './add-table-value.component.html',
  styleUrls: ['./add-table-value.component.css'],
})
export class AddTableValueComponent implements OnInit {
  selectedChipValues: string[] = [];
  dropdownTableOptions: { id: number, name: string }[] = [];
  dropdownRoleOptions2: { id: number, name: string }[] = [];
  prefillData: { table_id: number; column_id: number; value: string }[] = [];

  allPermissions: Permission[] = [];
  selectedPermissionIds: Set<number> = new Set();
  selectedPermissions: { id: number; name: string }[] = [];
  roles: Role[] = [];
  selectedRoleId: number | null = null;
  id: number | null = null;
  currentUserId: any;

  submissionSuccess: boolean = false;
  submissionMessage: string = '';

  // 🔹 NEW: Flag to trigger child reset
  resetTrigger: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private dropdownValuesService: DropdownValuesService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    let user = this.authService.getUser();
    this.currentUserId = user?.id;
    this.getTableName();
    this.fetchDropdownValues(this.id);
  }

  getTableName() {
    this.tableService.getAll().subscribe((res: ApiResponse) => {
      if (res.success && Array.isArray(res.data)) {
        this.dropdownTableOptions = res.data
          .filter((t: any) => t.name && t.name.trim() !== '')
          .map((t: any) => ({ id: t.id, name: t.name.trim() }));
      }
    });
  }

  onDropdown1Selected(tableId: number) {
    this.dropdownRoleOptions2 = [];
    this.tableService.getById(tableId).subscribe((res: ApiResponse) => {
      if (res.success && res.data && Array.isArray(res.data.columns)) {
        this.dropdownRoleOptions2 = res.data.columns
          .filter((col: any) =>
            ['column1', 'column2'].includes(col.name?.toLowerCase()?.trim())
          )
          .map((col: any) => ({ id: col.id, name: col.name.trim() }));
      }
    });
  }

  fetchDropdownValues(id: number) {
    if (!id) return;
    this.dropdownValuesService.getById(id).subscribe((res: ApiResponse) => {
      if (res.success && res.data) {
        const data = res.data;
        this.tableService.getById(data.table_id).subscribe((tableRes: ApiResponse) => {
          if (tableRes.success && Array.isArray(tableRes.data.columns)) {
            this.dropdownRoleOptions2 = tableRes.data.columns
              .filter((col: any) =>
                ['column1', 'column2'].includes(col.name?.toLowerCase()?.trim())
              )
              .map((col: any) => ({ id: col.id, name: col.name.trim() }));

            this.prefillData = [{
              table_id: data.table_id,
              column_id: data.column_id,
              value: data.value,
            }];
          }
        });
      }
    });
  }

  // 🔹 When user clicks Save Selection
  onChipSelection(selectedChips: { table_id: number; column_id: number; value: string }[]) {
    if (selectedChips.length === 0) return;

    const payload = selectedChips.map(chip => ({
      column_id: chip.column_id,
      value: chip.value,
      created_by: this.currentUserId
    }));

    if (this.id) {
      const updatePayload = { ...payload[0], updated_by: this.currentUserId };
      this.dropdownValuesService.update(this.id, updatePayload).subscribe({
        next: (res) => {
          this.submissionSuccess = true;
          this.submissionMessage = 'Updated successfully!';
          this.resetTableValues();
        },
        error: (err) => console.error('❌ Error updating:', err)
      });
    } else {
      let completed = 0;
      payload.forEach(item => {
        this.dropdownValuesService.create(item).subscribe({
          next: (res) => {
            completed++;
            if (completed === payload.length) {
              this.submissionSuccess = true;
              this.submissionMessage = 'Added successfully!';
              this.resetTableValues();
            }
          },
          error: (err) => console.error('❌ Error creating:', err)
        });
      });
    }
  }

  // 🔹 Reset both parent and child
  resetTableValues() {
    this.selectedChipValues = [];
    this.prefillData = [];

    // 🔸 Trigger reset in child
    this.resetTrigger = !this.resetTrigger;

    setTimeout(() => {
      this.submissionSuccess = false;
      this.submissionMessage = '';
    }, 500);
  }
}