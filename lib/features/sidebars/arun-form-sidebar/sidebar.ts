export const FULL_MENU = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Overview',
        icon: 'fas fa-th',
        path: '/dashboard/overview',
        tooltip: 'View Dashboard Overview',
        show: true,
      },
      {
        label: 'Day Closings',
        icon: 'fas fa-lock',
        path: '/dashboard/day-closings',
        tooltip: 'Manage User-wise Day Closings',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Reports',
        icon: 'fas fa-file-alt',
        path: '/dashboard/reports',
        tooltip: 'View dynamic table reports',
        show: true,
      },
      // {
      //   label: 'AI Sales Prediction',
      //   icon: 'fas fa-chart-line',
      //   path: '/dashboard/ai-prediction',
      //   tooltip: 'AI Sales Prediction',
      //   canView: ['admin', 'super_admin'],
      // },
    ],
  },
  // {
  //   label: 'Tables',
  //   items: [
  //     {
  //       label: 'Table',
  //       icon: 'fas fa-id-card',
  //       path: '/dashboard/dynamic-tables',
  //       tooltip: 'View table profiles',
  //       canView: ['admin', 'super_admin', 'staff', 'form'],
  //     },
  //   ],
  // },

  {
    label: 'Table Management',
    items: [
      // {
      //   label: 'All Dropdowns & Values',
      //   icon: 'fas fa-table',
      //   path: '/dashboard/customer/all-dropdowns',
      //   tooltip: 'View all customer dropdowns',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
      // {
      //   label: 'All tables',
      //   icon: 'fas fa-table',
      //   path: '/dashboard/tables/tables',
      //   tooltip: 'View all customer tables',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
      // {
      //   label: 'Create table',
      //   icon: 'fas fa-plus',
      //   path: '/dashboard/tables/table-view',
      //   tooltip: 'Add a new table',
      //   canView: ['super_admin'], 
      // },

      // {
      //   label: 'Column Values',
      //   icon: 'fas fa-columns',
      //   path: '/dashboard/tables/add-table-value',
      //   tooltip: 'Manage column values',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },

      // {
      //   label: 'All Column Values',
      //   icon: 'fas fa-list',
      //   path: '/dashboard/tables/all-column-values',
      //   tooltip: 'Manage all column values',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
    ],
  },
  {
    label: 'User & Role Management',
    items: [
      {
        label: 'Users',
        icon: 'fas fa-users',
        path: '/dashboard/roles/user',
        tooltip: 'Manage Users',
        canView: ['admin', 'super_admin'],
      },
      // {
      //   label: 'Roles',
      //   icon: 'fas fa-shield-alt',
      //   path: '/dashboard/roles/role',
      //   tooltip: 'Manage Roles',
      //   canView: ['admin', 'super_admin'],
      // },
      // {
      //   label: 'Add Role Permissions',
      //   icon: 'fas fa-user-shield',
      //   path: '/dashboard/roles/add-role-permission',
      //   tooltip: 'Manage Role Permissions',
      //   canView: ['admin', 'super_admin'],
      // },
    ],
  },
];
