import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayClosingService {
  private readonly baseUrl = `${environment.apiUrl}/day-closing`;

  constructor(private http: HttpClient) {}

  /**
   * Checks if the day is closed for a specific user and table via API.
   */
  isDayClosed(userId: number, tableId: number): Observable<{ is_closed: boolean, closing_id: number | null }> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.post<any>(`${this.baseUrl}/check-status`, {
      user_id: userId,
      table_id: tableId,
      date: today
    }).pipe(
      map(res => ({ is_closed: !!res.is_closed, closing_id: res.closing_id })),
      catchError(() => of({ is_closed: false, closing_id: null }))
    );
  }

  /**
   * Marks the day as closed for a specific user and table via API.
   */
  closeDay(userId: number, tableId: number): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.post(`${this.baseUrl}/close`, {
      user_id: userId,
      table_id: tableId,
      date: today
    });
  }

  /**
   * Reopens a specific closed day (Admin only).
   */
  reopenDay(closingId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reopen`, { id: closingId });
  }

  /**
   * Reopens a day for a specific user and table.
   */
  reopenDayByUser(userId: number, tableId: number): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.post(`${this.baseUrl}/reopen-by-user`, {
      user_id: userId,
      table_id: tableId,
      date: today
    });
  }

  /**
   * Gets all closings for the admin panel.
   */
  getAllClosings(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
