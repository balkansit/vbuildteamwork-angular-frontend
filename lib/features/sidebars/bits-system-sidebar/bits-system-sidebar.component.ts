import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { FULL_MENU } from './sidebar';

@Component({
    selector: 'app-bits-system-sidebar',
    templateUrl: './bits-system-sidebar.component.html',
    styleUrls: ['./bits-system-sidebar.component.css'],
    standalone: false,
})
export class BitsSystemSidebarComponent implements OnInit {
    @Input() isSidebarCollapsed: boolean = false;
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
            this.userRole = user.role_slug || (user.role_name ? user.role_name.toLowerCase().replace(/ /g, '_') : null);
        } else {
            this.userRole = null;
        }
    }

    renderMenu() {
        if (!this.userRole) {
            this.refreshUserRole();
        }
        // For development, if no role, assume super_admin/admin access or show all
        // But logically, show all or filtered. 
        // If userRole is null, we might want to default to something or show nothing.
        // For now, let's just render all if canView includes 'user' or if we want to be permissive.

        // Simplification:
        this.SidebarMenu = FULL_MENU.map((section: any) => {
            const filteredItems = section.items.filter((item: any) => {
                if (!this.userRole) return true; // Show all if no role detected (dev mode)
                return item.canView.includes(this.userRole);
            });

            return filteredItems.length > 0
                ? { ...section, items: filteredItems }
                : null;
        }).filter((section): section is { items: any[] } => section !== null);
    }
}
