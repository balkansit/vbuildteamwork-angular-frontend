import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-full-layout-arun-form',
  standalone: false,
  templateUrl: './sidebar-full-layout-arun-form.html',
  styleUrls: ['./sidebar-full-layout-arun-form.component.css'],
})
export class SidebarFullLayoutArunFormComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
