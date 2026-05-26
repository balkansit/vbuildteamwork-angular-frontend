import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@lib/services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = route.data['roles'] as string[]; // passed in route
    const user = this.authService.getUser(); // { id: ..., role_slug: 'admin' }

    if (user && allowedRoles.includes(user.role_slug)) {
      return true;
    }

    // Redirect if not allowed
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
