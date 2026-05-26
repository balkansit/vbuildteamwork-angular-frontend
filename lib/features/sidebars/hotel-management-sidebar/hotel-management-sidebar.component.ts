import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { FULL_MENU } from './sidebar'; // Importing the full menu structure

@Component({
  selector: 'app-hotel-management-sidebar',
  templateUrl: './hotel-management-sidebar.component.html',
  styleUrls: ['./hotel-management-sidebar.component.css'],
  standalone: false,
})
export class HotelManagementSidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Accepting the collapsed state from parent
  SidebarMenu: any[] = [];

  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.refreshUserRole();
  }

  ngOnInit(): void {
    this.renderMenu();
  }

  refreshUserRole() {
    const user = this.authService.getUser();
    if (user) {
      if (user.role_slug) {
        this.userRole = user.role_slug;
      } else if (user.role_name) {
        // Fallback: normalize role name (e.g. "Super Admin" -> "super_admin")
        this.userRole = user.role_name.toLowerCase().replace(/ /g, '_');
        console.warn(
          'Sidebar: role_slug missing, derived from name:',
          this.userRole
        );
      } else {
        this.userRole = null;
      }
    } else {
      this.userRole = null;
    }
    console.log('Sidebar: Current User Role Slug:', this.userRole);
  }

  renderMenu() {
    if (!this.userRole) {
      this.refreshUserRole();
    }

    this.SidebarMenu = FULL_MENU.map((section: any) => {
      const filteredItems = section.items.filter((item: any) => {
        const hasAccess = item.canView.includes(this.userRole);
        if (!hasAccess) {
          // Optional: Log hidden items for debugging if needed
          // console.log(`Hiding ${item.label} for role ${this.userRole}`);
        }
        return hasAccess;
      });

      return filteredItems.length > 0
        ? { ...section, items: filteredItems }
        : null;
    }).filter((section): section is { items: any[] } => section !== null);

    console.log(
      'Sidebar: Menu Rendered',
      this.SidebarMenu.map((s) => s.label)
    );
  }

  canSee(item: { canView: string | string[] }) {
    console.log('Checking visibility for item:', item);
  }
}
