import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@lib/models/ApiResponse.model';

export abstract class BaseService<T> {
  protected abstract baseUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl, { params });
  }

  getById(id: number | string, params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`, { params });
  }

  create(data: T): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, data);
  }

  update(id: number | string, data: T): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number | string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
