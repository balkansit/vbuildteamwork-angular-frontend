export interface SidebarItem {
    label: string;
    route?: string;
    icon?: string;
    roles?: string[];
    children?: SidebarItem[];
}

export const SIDEBAR_CONFIG: SidebarItem[] = [
    {
        label: 'Dashboards',
        icon: 'fa-tachometer-alt',
        children: [
            { label: 'CRM Dashboard', route: '/dashboards/crm' },
            { label: 'Project Dashboard', route: '/dashboards/projects' },
            { label: 'Invoice Overview', route: '/dashboards/invoices' }
        ]
    },
    {
        label: 'CRM & Finance',
        icon: 'fa-briefcase',
        children: [
            { label: 'Customers', route: '/crm/customers' },
            { label: 'Quotations', route: '/crm/quotations' },
            { label: 'Invoices', route: '/crm/invoices' },
            { label: 'Payments', route: '/crm/payments' },
            { label: 'Expenses', route: '/crm/expenses' }
        ]
    },
    {
        label: 'Education',
        icon: 'fa-graduation-cap',
        children: [
            { label: 'Students', route: '/education/students' },
            { label: 'Courses', route: '/education/courses' },
            { label: 'Batches', route: '/education/batches' },
            { label: 'Enrollments', route: '/education/enrollments' },
            { label: 'Certificates', route: '/education/certificates' }
        ]
    },
    {
        label: 'Reports',
        icon: 'fa-chart-line',
        children: [
            { label: 'Sales Report', route: '/reports/sales' },
            { label: 'Outstanding Report', route: '/reports/outstanding' },
            { label: 'Tax Report', route: '/reports/tax' }
        ]
    }
];
