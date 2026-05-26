import { InjectionToken } from '@angular/core';

// Injection token so host apps can supply the RBAC API base URL safely.
export const RBAC_API_URL = new InjectionToken<string>('RBAC_API_URL');
