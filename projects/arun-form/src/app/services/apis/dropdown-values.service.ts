import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '@lib/services/api/base.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownValuesService extends BaseService<any> {
  protected override baseUrl = `${environment.apiUrl}/column-dropdowns`;
  constructor(protected override http: HttpClient) {
    super(http);
  }
}
