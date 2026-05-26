import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@lib/services/api/base.service';
import { environment } from 'projects/arun-form/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService<any> {
  protected override baseUrl = `${environment.apiUrl}/roles`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
