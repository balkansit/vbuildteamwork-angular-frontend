import { Component, Input, input } from '@angular/core';

interface MenuItem {
  routerLink: string;
  id: number;
  label: string;
  icon: string;
  expanded?: boolean;
  selected?: boolean;
  submenus?: MenuItem[];
  submenuSelectedId?: number | null;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isToggle: boolean = false;

  ngOnChanges() {
    console.log('Sidebar collapsed:', this.isToggle);
    if (this.isToggle) {
    }
  }

  menuGroups = [
    {
      heading: 'Main Menu',
      menus: <MenuItem[]>[
        {
          id: 1,
          label: 'Invoice',
          icon: 'fa-tachometer-alt',
          routerLink: '/invoice/create',
          selected: true,
        },
        {
          id: 2,
          label: 'Invoices',
          icon: 'fa-list', // Changed to list icon
          routerLink: '/invoice/all',
          selected: true,
        },
        // {
        //   id: 3,
        //   label: 'Orders',
        //   icon: 'fa-shopping-cart',
        //   expanded: false,
        //   submenus: [
        //     { id: 31, label: 'New Orders', icon: 'fa-plus' },
        //     { id: 32, label: 'Processed', icon: 'fa-check' },
        //   ],
        // },
        // {
        //   id: 4,
        //   label: 'Products',
        //   icon: 'fa-box-open',
        //   expanded: false,
        //   submenus: [
        //     { id: 41, label: 'Add Product', icon: 'fa-plus' },
        //     { id: 42, label: 'List Products', icon: 'fa-list' },
        //   ],
        // },
      ],
    },
    {
      heading: 'Settings',
      menus: <MenuItem[]>[
        {
          id: 5,
          label: 'User Management',
          icon: 'fa-users-cog',
          expanded: false,
          submenus: [
            { id: 51, label: 'Users', icon: 'fa-user' },
            { id: 52, label: 'Roles', icon: 'fa-user-shield' },
          ],
        },
      ],
    },
  ];
  toggleMenu(groupIndex: number, menuId: number) {
    this.clearAllSelections(); // 🔄 Clear everything before toggling

    const group = this.menuGroups[groupIndex];
    const menu = group.menus.find((m) => m.id === menuId);

    if (menu) {
      menu.selected = true;
      menu.expanded = !menu.expanded;
    }
  }

  selectMenu(groupIndex: number, menuId: number) {
    this.clearAllSelections();

    const group = this.menuGroups[groupIndex];
    const menu = group.menus.find((m) => m.id === menuId);

    if (menu) {
      menu.selected = true;
      menu.expanded = false;
    }
  }

  selectSubmenu(groupIndex: number, menuId: number, submenuId: number) {
    this.clearAllSelections();

    const group = this.menuGroups[groupIndex];
    const menu = group.menus.find((m) => m.id === menuId);

    if (menu) {
      menu.selected = true;
      menu.expanded = true;
      menu.submenuSelectedId = submenuId;
    }
  }

  private clearAllSelections() {
    for (const group of this.menuGroups) {
      for (const menu of group.menus) {
        menu.selected = false;
        menu.expanded = false;
        menu.submenuSelectedId = null;
      }
    }
  }
}
