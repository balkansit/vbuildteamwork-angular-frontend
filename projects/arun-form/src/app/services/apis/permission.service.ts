import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '@lib/services/api/base.service';
import { Permission } from '../../models/dbschema/permissions.model';


@Injectable({
  providedIn: 'root',
})
export class PermissionService extends BaseService<Permission> {
  protected override baseUrl = `${environment.apiUrl}/permissions`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
