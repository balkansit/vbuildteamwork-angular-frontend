import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '@lib/services/api/base.service';
import { Table } from '../../models/dbschema/tables.model';

@Injectable({
  providedIn: 'root',
})
export class TableService extends BaseService<Table> {
  protected override baseUrl = `${environment.apiUrl}/tables`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
