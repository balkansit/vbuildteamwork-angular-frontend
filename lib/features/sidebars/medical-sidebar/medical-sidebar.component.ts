import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { FULL_MENU } from './sidebar'; // Importing the full menu structure

@Component({
  selector: 'app-medical-sidebar',
  templateUrl: './medical-sidebar.component.html',
  styleUrls: ['./medical-sidebar.component.css'],
  standalone: false,
})
export class MedicalSidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Accepting the collapsed state from parent
  SidebarMenu: any[] = [];

  userRole: string | null;
  expandedSection: number | null = null; // currently expanded section
  constructor(private authService: AuthService) {
    const user = this.authService.getUser(); // or however you access user
    this.userRole = user?.role_slug;
  }

  ngOnInit(): void {
    this.SidebarMenu = FULL_MENU.map((section: { items: any[] }) => {
      console.log('Processing section:', this.userRole);
      const filteredItems = section.items.filter((item) =>
        item.canView.includes(this.userRole!)
      );
      return filteredItems.length > 0
        ? { ...section, items: filteredItems, collapsed: true }
        : null;
    }).filter(
      (section): section is { items: any[]; collapsed: boolean } =>
        section !== null
    );
    console.log('Filtered Sidebar Menu:', this.isSidebarCollapsed);
  }

  canSee(item: { canView: string | string[] }) {
    console.log('Checking visibility for item:', item);
  }

  toggleSection(index: number) {
    const isCurrentlyCollapsed = this.SidebarMenu[index].collapsed === true;

    if (isCurrentlyCollapsed) {
      // Opening this section: collapse all others
      this.SidebarMenu.forEach((section, i) => {
        if (i !== index) section.collapsed = true;
      });
      this.SidebarMenu[index].collapsed = false;
      this.expandedSection = index;
    } else {
      // Closing this section
      this.SidebarMenu[index].collapsed = true;
      if (this.expandedSection === index) {
        this.expandedSection = null;
      }
    }
  }
}
