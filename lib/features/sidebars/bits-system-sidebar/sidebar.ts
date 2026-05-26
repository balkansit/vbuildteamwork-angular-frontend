export const FULL_MENU = [
    {
        label: 'Main',
        items: [
            {
                label: 'Overview',
                path: '/dashboard/overview',
                icon: 'fas fa-tachometer-alt',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Dashboard Overview'
            },
        ]
    },
    {
        label: 'CRM',
        items: [
            {
                label: 'CRM Dashboard',
                path: '/dashboard/crm/dashboard',
                icon: 'fas fa-chart-line',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'CRM Dashboard'
            },
            {
                label: 'Customers',
                path: '/dashboard/crm/customers',
                icon: 'fas fa-users',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Customers'
            },
            {
                label: 'Quotations',
                path: '/dashboard/crm/quotations',
                icon: 'fas fa-file-invoice',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Quotations'
            },
            {
                label: 'Invoices',
                path: '/dashboard/crm/invoices',
                icon: 'fas fa-file-invoice-dollar',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Invoices'
            },
            {
                label: 'Project Finances',
                path: '/dashboard/crm/project-finances',
                icon: 'fas fa-project-diagram',
                canView: ['super_admin', 'admin'],
                tooltip: 'Manage Project Finances'
            },
            {
                label: 'Receipts',
                path: '/dashboard/crm/receipts',
                icon: 'fas fa-receipt',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Receipts'
            },
            {
                label: 'Payment Accounts',
                path: '/dashboard/crm/payment-accounts',
                icon: 'fas fa-university',
                canView: ['super_admin', 'admin'],
                tooltip: 'Manage Payment Accounts'
            },
        ]
    },
    {
        label: 'Education',
        items: [
            {
                label: 'Students',
                path: '/dashboard/education/students',
                icon: 'fas fa-user-graduate',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Students'
            },
            {
                label: 'Courses',
                path: '/dashboard/education/courses',
                icon: 'fas fa-book',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Courses'
            },
            {
                label: 'Batches',
                path: '/dashboard/education/batches',
                icon: 'fas fa-chalkboard-teacher',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Batches'
            },
            {
                label: 'Enrollments',
                path: '/dashboard/education/enrollments',
                icon: 'fas fa-user-plus',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Enrollments'
            },
            {
                label: 'Training Invoices',
                path: '/dashboard/education/training-invoices',
                icon: 'fas fa-file-invoice',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Training Invoices'
            },
            {
                label: 'Training Payments',
                path: '/dashboard/education/training-payments',
                icon: 'fas fa-money-bill-wave',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Training Payments'
            },
            {
                label: 'Training Receipts',
                path: '/dashboard/education/training-receipts',
                icon: 'fas fa-receipt',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Training Receipts'
            },
            {
                label: 'Certificates',
                path: '/dashboard/education/certificates',
                icon: 'fas fa-certificate',
                canView: ['super_admin', 'admin', 'user'],
                tooltip: 'Manage Certificates'
            }
        ]
    },
    {
        label: 'User Management',
        items: [
            {
                label: 'Users',
                path: '/dashboard/user-role-management/users',
                icon: 'fas fa-users',
                canView: ['super_admin'],
                tooltip: 'Manage Users'
            },
            {
                label: 'Roles',
                path: '/dashboard/user-role-management/roles',
                icon: 'fas fa-user-tag',
                canView: ['super_admin'],
                tooltip: 'Manage Roles'
            },
            {
                label: 'Permissions',
                path: '/dashboard/user-role-management/permissions',
                icon: 'fas fa-key',
                canView: ['super_admin'],
                tooltip: 'Manage Permissions'
            },
            {
                label: 'Role Permission',
                path: '/dashboard/user-role-management/role-permission',
                icon: 'fas fa-user-shield',
                canView: ['super_admin'],
                tooltip: 'Assign Role Permissions'
            },
        ]
    },
    {
        label: 'Settings',
        items: [
            {
                label: 'Invoice Settings',
                path: '/dashboard/crm/settings',
                icon: 'fas fa-cog',
                canView: ['super_admin', 'admin'],
                tooltip: 'Configure Invoice Settings'
            },
            {
                label: 'Institute Settings',
                path: '/dashboard/education/settings',
                icon: 'fas fa-school',
                canView: ['super_admin', 'admin'],
                tooltip: 'Configure Institute Settings'
            },
        ]
    }
];
