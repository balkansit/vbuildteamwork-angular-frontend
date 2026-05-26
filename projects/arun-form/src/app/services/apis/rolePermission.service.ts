import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@lib/services/api/base.service';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { environment } from 'projects/arun-form/src/environments/environment';
import { RolePermissions } from '../../models/dbschema/role-permissions.model';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService extends BaseService<RolePermissions> {
  protected override baseUrl = `${environment.apiUrl}/role-permissions`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createPermissions(roleId: number, permissionIds: number[]) {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, {
      role_id: roleId,
      permission_ids: permissionIds,
    });
  }

  updatePermissions(roleId: number, permissionIds: number[]) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${roleId}`, {
      permission_ids: permissionIds,
    });
  }
}