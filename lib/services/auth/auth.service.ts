import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../storage/local-storage.service';
// Adjust path as needed

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sendOtp(phone: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(API_URL) private apiUrl: string,
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService
  ) {}

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private user: any | null = null;

  static readonly SUPER_ADMIN_ROLE = 'super_admin';
  static readonly ADMIN_ROLE = 'admin';
  static readonly STAFF_ROLE = 'staff';
  static readonly USER_ROLE = 'user';
  static readonly GUEST_ROLE = 'guest';
  static readonly MEMBER_ROLE = 'member';

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response?.token) {
          this.setToken(response.token);
          if (response.user) {
            this.setUser(response.user);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  requestOtp(phone: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/setup/request-otp`, phone)
      .pipe(catchError(this.handleError));
  }

  verifyOtp(phone: string, otp: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/setup/verify-otp`, { phone, otp })
      .pipe(catchError(this.handleError));
  }

  setup(formValue: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/setup/complete`, formValue)
      .pipe(catchError(this.handleError));
  }

  register(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/register`, user)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    // Call backend logout endpoint first
    this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe({
      next: () => {
        // Clear local auth data
        this.deleteToken();
        this.tokenSubject.next(null);
        this.deleteUser();

        // Clear hotel and related session data
        this.localStorageService.removeItem('hotel_id');
        this.localStorageService.removeItem('hotelId');
        this.localStorageService.removeItem('hotel_name');
        this.localStorageService.removeItem('hotelName');
        this.localStorageService.removeItem('tenant_id');
        this.localStorageService.removeItem('tenantId');

        this.redirectToLogin();
      },
      error: (error) => {
        // Even if backend logout fails, clear local data and redirect
        console.error('Logout error:', error);
        this.deleteToken();
        this.tokenSubject.next(null);
        this.deleteUser();

        // Clear hotel and related session data
        this.localStorageService.removeItem('hotel_id');
        this.localStorageService.removeItem('hotelId');
        this.localStorageService.removeItem('hotel_name');
        this.localStorageService.removeItem('hotelName');
        this.localStorageService.removeItem('tenant_id');
        this.localStorageService.removeItem('tenantId');

        this.redirectToLogin();
      },
    });
  }

  setUser(user: any): void {
    this.user = user;
    this.localStorageService.setItem('user', user);
  }

  getUser(): any | null {
    return this.user || this.localStorageService.getItem<any>('user') || null;
  }

  deleteUser(): void {
    this.user = null;
    this.localStorageService.removeItem('user');
  }

  getRole(): string | null {
    return this.getUser()?.role_slug || null;
  }

  isSuperAdmin(): boolean {
    return this.getRole() === AuthService.SUPER_ADMIN_ROLE;
  }

  isAdmin(): boolean {
    return this.getRole() === AuthService.ADMIN_ROLE;
  }

  isStaff(): boolean {
    return this.getRole() === AuthService.STAFF_ROLE;
  }

  isUser(): boolean {
    return this.getRole() === AuthService.USER_ROLE;
  }

  isGuest(): boolean {
    const user = this.getUser();
    return user?.role_id === 2 || this.getRole() === AuthService.GUEST_ROLE;
  }

  isMember(): boolean {
    return this.getRole() === AuthService.MEMBER_ROLE;
  }

  isFormStatusController(formNumber: number): boolean {
    if (!formNumber) return false;
    const role = this.getRole();
    const expectedRole = `statusControllerForm${formNumber}`;
    return (
      role === (AuthService as any)[`STATUS_CONTROLLER_FORM_${formNumber}`] ||
      role === expectedRole
    );
  }

  getUserPermissions(): string[] {
    const user = this.getUser();
    return user?.permissions || [];
  }

  hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    const userPermissions = this.getUserPermissions();
    return permissions.some((permission) =>
      userPermissions.includes(permission)
    );
  }

  hasAllPermissions(permissions: string[]): boolean {
    const userPermissions = this.getUserPermissions();
    return permissions.every((permission) =>
      userPermissions.includes(permission)
    );
  }

  isAuthenticated(): boolean {
    return (
      !!this.tokenSubject.value ||
      !!this.localStorageService.getItem<string>('token')
    );
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
    this.localStorageService.setItem('token', token);
  }

  getToken(): string | null {
    return (
      this.tokenSubject.value ||
      this.localStorageService.getItem<string>('token')
    );
  }

  deleteToken(): void {
    this.localStorageService.removeItem('token');
  }

  redirectToLogin(): void {
    this.router.navigate(['auth', 'login']);
  }

  // ------------------------------
  // TENANT / SHOP / TERMINAL CONTEXT
  // ------------------------------
  getTenantId(): number | null {
    return Number(localStorage.getItem('tenant_id')) || null;
  }

  setTenantId(id: number): void {
    localStorage.setItem('tenant_id', id.toString());
  }

  getShopId(): number | null {
    return Number(localStorage.getItem('shop_id')) || null;
  }

  setShopId(id: number): void {
    localStorage.setItem('shop_id', id.toString());
  }

  setShop(shop: any): void {
    localStorage.setItem('shop', JSON.stringify(shop));
  }

  getShop(): any | null {
    const shop = localStorage.getItem('shop');
    return shop ? JSON.parse(shop) : null;
  }

  setShiftSession(shiftSession: any): void {
    localStorage.setItem('shift_session', JSON.stringify(shiftSession));
  }

  getShiftSession(): any | null {
    const shiftSession = localStorage.getItem('shift_session');
    return shiftSession ? JSON.parse(shiftSession) : null;
  }

  setShiftSessionId(id: number): void {
    localStorage.setItem('shift_session_id', id.toString());
  }

  getShiftSessionId(): number | null {
    return Number(localStorage.getItem('shift_session_id')) || null;
  }

  clearShiftSession(): void {
    localStorage.removeItem('shift_session_id');
    localStorage.removeItem('shift_session');
  }

  setTerminal(terminal: any): void {
    localStorage.setItem('terminal', JSON.stringify(terminal));
  }

  getTerminal(): any | null {
    const terminal = localStorage.getItem('terminal');
    return terminal ? JSON.parse(terminal) : null;
  }

  getTerminalId(): number | null {
    return Number(localStorage.getItem('terminal_id')) || null;
  }

  setTerminalId(id: number): void {
    localStorage.setItem('terminal_id', id.toString());
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
