import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { RBAC_API_URL } from './rbac.tokens';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private get apiUrl() {
    return `${this.apiBase}/roles`;
  }

  constructor(
    private http: HttpClient,
    @Inject(RBAC_API_URL) private readonly apiBase: string
  ) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  show(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
