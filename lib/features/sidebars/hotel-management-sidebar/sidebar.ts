export const FULL_MENU = [
  // Dashboard Section
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Overview',
        icon: 'fas fa-th-large',
        path: '/dashboard/overview',
        tooltip: 'Dashboard Overview',
        canView: ['admin', 'super_admin', 'staff', 'user'],
      },
    ],
  },

  // Reception Desk Section
  {
    label: 'Reception Desk',
    items: [
      {
        label: 'Quick Booking',
        icon: 'fas fa-plus-circle',
        path: '/dashboard/reception-desk/quick-booking',
        tooltip: 'New Booking Wizard',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Check In/Out',
        icon: 'fas fa-concierge-bell',
        path: '/dashboard/reception-desk/check-in-out',
        tooltip: 'Daily Arrivals & Departures',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Search Bookings',
        icon: 'fas fa-search',
        path: '/dashboard/booking-management/search-bookings',
        tooltip: 'Search Bookings',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  // Booking Management Section
  {
    label: 'Booking Management',
    items: [
      {
        label: 'All Bookings',
        icon: 'fas fa-calendar-check',
        path: '/dashboard/booking-management/all-bookings',
        tooltip: 'View All Bookings',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Confirmed Bookings',
        icon: 'fas fa-check-circle',
        path: '/dashboard/booking-management/confirm-bookings',
        tooltip: 'Confirmed Bookings',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Draft Bookings',
        icon: 'fas fa-pencil-alt',
        path: '/dashboard/booking-management/draft-bookings',
        tooltip: 'Draft Bookings',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Cancelled Bookings',
        icon: 'fas fa-times-circle',
        path: '/dashboard/booking-management/cancelled-bookings',
        tooltip: 'Cancelled Bookings',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Cancellation Requests',
        icon: 'fas fa-ban',
        path: '/dashboard/booking-management/cancellation',
        tooltip: 'Cancellation Requests',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  // Space Management Section
  {
    label: 'Space Management',
    items: [
      {
        label: 'All Spaces',
        icon: 'fas fa-building',
        path: '/dashboard/space-management/space/all-space',
        tooltip: 'View All Spaces',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Add Space',
        icon: 'fas fa-plus-square',
        path: '/dashboard/space-management/space/add-space',
        tooltip: 'Add New Space',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Space Types',
        icon: 'fas fa-th-large',
        path: '/dashboard/space-management/space-types/list-space-types',
        tooltip: 'Manage Space Types',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Space Facilities',
        icon: 'fas fa-cogs',
        path: '/dashboard/space-management/space-facilities/list-space-facilities',
        tooltip: 'Manage Facilities',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Extra Charges',
        icon: 'fas fa-cash-register',
        path: '/dashboard/space-management/space-extra-charges/space-extra-charges',
        tooltip: 'Space Extra Charges',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  // CRM (Customer Relationship Management) Section
  {
    label: 'CRM',
    items: [
      {
        label: 'All Customers',
        icon: 'fas fa-users',
        path: '/dashboard/crm/customers/all-customers',
        tooltip: 'View All Customers',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Feedback & Reviews',
        icon: 'fas fa-star',
        path: '/dashboard/crm/customers/feedback',
        tooltip: 'Customer Feedback',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  // Finance Section
  {
    label: 'Finance',
    items: [
      {
        label: 'Expenses',
        icon: 'fas fa-money-bill-wave',
        path: '/dashboard/finance/expenses/expense-list',
        tooltip: 'Expense Management',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Expense Categories',
        icon: 'fas fa-list-alt',
        path: '/dashboard/finance/expense-categories/expense-categories-list',
        tooltip: 'Expense Categories',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  // Hotel Management Section
  {
    label: 'Hotel Management',
    items: [
      {
        label: 'All Hotels',
        icon: 'fas fa-hotel',
        path: '/dashboard/hotel-management/all-hotels',
        tooltip: 'View All Hotels',
        canView: ['super_admin'],
      },
      {
        label: 'Add Hotel',
        icon: 'fas fa-plus-circle',
        path: '/dashboard/hotel-management/add-hotel',
        tooltip: 'Add New Hotel',
        canView: ['super_admin'],
      },
    ],
  },

  // HRMS (Human Resource Management System) Section
  {
    label: 'HRMS',
    items: [
      {
        label: 'All Employees',
        icon: 'fas fa-users-cog',
        path: '/dashboard/hr-management/employees',
        tooltip: 'View All Employees',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Attendance',
        icon: 'fas fa-calendar-check',
        path: '/dashboard/hr-management/employee-attendance',
        tooltip: 'Employee Attendance',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Leave Management',
        icon: 'fas fa-calendar-times',
        path: '/dashboard/hr-management/employee-leaves',
        tooltip: 'Employee Leaves',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Payroll',
        icon: 'fas fa-money-check-alt',
        path: '/dashboard/hr-management/employee-payrolls',
        tooltip: 'Employee Payrolls',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  // Access & Security Section
  {
    label: 'Access & Security',
    items: [
      {
        label: 'Account Access',
        icon: 'fas fa-user-friends',
        path: '/dashboard/user-role-management/users',
        tooltip: 'View All Users',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'All Roles',
        icon: 'fas fa-user-tag',
        path: '/dashboard/user-role-management/roles',
        tooltip: 'View All Roles',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Add Role',
        icon: 'fas fa-plus-circle',
        path: '/dashboard/user-role-management/add-role',
        tooltip: 'Add New Role',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'All Permissions',
        icon: 'fas fa-key',
        path: '/dashboard/user-role-management/permissions',
        tooltip: 'View All Permissions',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'Role & Permission',
        icon: 'fas fa-user-shield',
        path: '/dashboard/user-role-management/role-permission',
        tooltip: 'Manage Roles & Permissions',
        canView: ['admin', 'super_admin'],
      },
    ],
  },
];
