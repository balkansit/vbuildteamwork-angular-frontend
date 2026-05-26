import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-full-layout',
  standalone: false,
  templateUrl: './sidebar-full-layout.component.html',
  styleUrl: './sidebar-full-layout.component.css',
})
export class SidebarFullLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
