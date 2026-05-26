import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '@lib/services/api/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableColumnsService extends BaseService<any> {
  protected override baseUrl = `${environment.apiUrl}/table-columns`;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  bulkCreate(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/table-columns`, payload); // your controller store() handles bulk if `records` exists
}

bulkUpdate(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/table-columns`, payload); // your controller update() handles bulk if `records` exists
}

}
