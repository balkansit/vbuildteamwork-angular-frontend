import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRoles'] as string[] | string;
    const userRole = this.authService.getRole();

    if (Array.isArray(expectedRoles)) {
      if (expectedRoles.includes(userRole)) {
        return true;
      }
    } else if (typeof expectedRoles === 'string') {
      if (expectedRoles === userRole) {
        return true;
      }
    } else if (!expectedRoles) {
      // No role restriction
      return true;
    }

    // Redirect to not-authorized page or login page
    this.router.navigate(['/not-authorized']);
    return false;
  }
}

/**
 * Example usage in routing module:
 *
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [RoleGuard],
 *   data: { expectedRole: 'admin' }
 * }
 */
