import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  collapsed: boolean = false;
  activeMenu: string = '';
  activeSubMenu: string = '';
  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  // Method to toggle main menu item
  toggleMenu(menu: string) {
    if (this.activeMenu === menu) {
      // If clicking the already active menu, toggle open/close
      this.activeMenu = ''; // Collapse the menu
    } else {
      // Switch to new menu and keep the sub-menu state intact if switching between parents
      this.activeMenu = menu;
    }
  }

  // Method to set active sub-menu item
  setActiveSubMenu(menu: string, subMenu: string) {
    this.activeMenu = menu; // Ensure the parent menu is always active when a sub-menu is active
    this.activeSubMenu = subMenu;
  }
}
