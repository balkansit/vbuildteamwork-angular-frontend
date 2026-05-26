import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RBAC_API_URL } from './rbac.tokens';
import { ApiResponse } from '@lib/models/ApiResponse.model';

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  label?: string;
  module?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private http: HttpClient,
    @Inject(RBAC_API_URL) private readonly apiBase: string
  ) {}

  getAll(): Observable<ApiResponse> {
    const apiUrl = `${this.apiBase}/permissions`;
    return this.http.get<ApiResponse>(apiUrl);
  }
}
