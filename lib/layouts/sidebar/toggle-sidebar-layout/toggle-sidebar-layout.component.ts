import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-toggle-sidebar-layout',
  standalone: false,
  templateUrl: './toggle-sidebar-layout.component.html',
  styleUrl: './toggle-sidebar-layout.component.css',
})
export class ToggleSidebarLayoutComponent {
  isSidebarCollapsed = false;
  isSidebarVisible = true;
  isMobile = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.isSidebarVisible = !this.isMobile;
    this.isSidebarCollapsed = false;
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isSidebarVisible = !this.isSidebarVisible;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
}
