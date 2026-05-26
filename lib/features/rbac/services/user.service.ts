import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RBAC_API_URL } from './rbac.tokens';
import { ApiResponse } from '@lib/models/ApiResponse.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string | string[]; // Adapt based on backend
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(RBAC_API_URL) private readonly apiBase: string
  ) {}

  getAll(): Observable<ApiResponse> {
    const apiUrl = `${this.apiBase}/users`;
    return this.http.get<ApiResponse>(apiUrl);
  }
}
