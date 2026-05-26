import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { RBAC_API_URL } from './rbac.tokens';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  private get apiUrl() {
    return `${this.apiBase}/role-permissions`;
  }

  constructor(
    private http: HttpClient,
    @Inject(RBAC_API_URL) private readonly apiBase: string
  ) {}

  createPermissions(
    roleId: number,
    permissionIds: number[]
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, {
      role_id: roleId,
      permission_ids: permissionIds,
    });
  }

  updatePermissions(
    roleId: number,
    permissionIds: number[]
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/${roleId}`, {
      permission_ids: permissionIds,
    });
  }

  getByRole(roleId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('role_id', roleId);
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }
}
