import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { FULL_MENU } from './sidebar'; // Importing the full menu structure
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-matrimony-sidebar',
  templateUrl: './matrimony-sidebar.component.html',
  styleUrls: ['./matrimony-sidebar.component.css'],
  standalone: false,
})
export class MatrimonySidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Accepting the collapsed state from parent
  SidebarMenu: any[] = [];
  @Input() logo: string = '';

  userRole: string | null;
  expandedSection: number | null = null; // currently expanded section

  constructor(private authService: AuthService, private translate: TranslateService) {
    const user = this.authService.getUser(); // or however you access user
    this.userRole = user?.role_slug;
  }
  
  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
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
    this.SidebarMenu[index].collapsed = !this.SidebarMenu[index].collapsed;
    if (this.expandedSection === index) {
      this.expandedSection = null; // collapse if already open
    } else {
      this.expandedSection = index; // expand the clicked section
    }
  }
}
