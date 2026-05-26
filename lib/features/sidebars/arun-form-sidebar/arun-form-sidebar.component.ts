import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { FULL_MENU } from './sidebar'; // Importing the full menu structure

@Component({
  selector: 'app-arun-form-sidebar',
  templateUrl: './arun-form-sidebar.component.html',
  styleUrls: ['./arun-form-sidebar.component.css'],
  standalone: false,
})
export class ArunFormSidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Accepting the collapsed state from parent
  SidebarMenu: any[] = [];

  userRole: string | null;

  constructor(private authService: AuthService) {
    const user = this.authService.getUser(); // or however you access user
    this.userRole = user?.role_slug;
  }

  ngOnInit(): void {
    this.SidebarMenu = FULL_MENU.map((section: { items: any[] }) => {
      const filteredItems = section.items.filter((item) => {
        if (!item.canView) {
          return true; // No restrictions, show to all
        }
        if (
          item.canView.some((view: string) =>
            new RegExp(`^${view}`).test(this.userRole!)
          )
        ) {
          return true;
        }
        return item.canView.includes(this.userRole!);
      });
      return filteredItems.length > 0
        ? { ...section, items: filteredItems }
        : null;
    }).filter((section): section is { items: any[] } => section !== null);

  }

  canSee(item: { canView: string | string[] }) {
    console.log('Checking visibility for item:', item);
  }
}
