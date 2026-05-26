import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';

@Directive({
  selector: '[hasRole]', // usage: *hasRole="['admin', 'staff']"
  standalone: true
})
export class HasRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  @Input() set hasRole(allowedRoles: string[]) {
    const user = this.authService.getUser();
    const roleSlug = user?.role_slug;
    const isGuest = user?.role_id === 2;

    const hasAccess = (roleSlug && allowedRoles.includes(roleSlug)) || 
                     (isGuest && allowedRoles.includes('guest'));

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
