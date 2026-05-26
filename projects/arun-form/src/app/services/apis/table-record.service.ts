import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '@lib/services/api/base.service';

@Injectable({
  providedIn: 'root',
})
export class TableRecordsService extends BaseService<any> {
 protected override baseUrl = `${environment.apiUrl}/table-records`;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  createTableRecord(data: any) {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
}