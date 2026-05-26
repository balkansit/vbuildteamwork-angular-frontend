export const FULL_MENU = [
  {
    label: 'DASHBOARD',
    icon: 'fas fa-tachometer-alt',
    items: [
      {
        label: 'OVERVIEW',
        icon: 'fas fa-th',
        path: '/dashboard/overview',
        tooltip: 'View Dashboard Overview',
        show: true,
        canView: ['admin', 'super_admin', 'staff', 'user'],
      }
    ],
  },
  {
    label: 'MEMBERS',
    icon: 'fas fa-user-friends',
    items: [
      {
        label: 'ALL_MEMBERS',
        icon: 'fas fa-users', // group icon
        path: '/dashboard/members/all-members',
        tooltip: 'View All Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'ADD_MEMBER',
        icon: 'fas fa-user-plus',
        path: '/dashboard/members/add-members',
        tooltip: 'Add New Member',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'OFFLINE_REGISTERED_MEMBERS',
        icon: 'fas fa-user-edit',
        path: '/dashboard/members/offline-registered-members',
        tooltip: 'View Offline Registered Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'PENDING_RENEWAL_MEMBERS',
        icon: 'fas fa-clock',
        path: '/dashboard/members/pending-renewal-members',
        tooltip: 'View Pending Renewal Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'INCOMPLETE_PROFILES',
        icon: 'fas fa-user-times',
        path: '/dashboard/members/incomplete-profiles',
        tooltip: 'View Incomplete Profiles',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'MEMBERS_WITHOUT_PROFILE_PICTURE',
        icon: 'fas fa-user-circle',
        path: '/dashboard/members/members-without-profile-pictures',
        tooltip: 'View Members Without Profile Pictures',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Bulk Members Print',
        icon: 'fas fa-print',
        path: '/dashboard/members/bulk-members-print',
        tooltip: 'Bulk Members Print',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'BLOCKED_MEMBERS',
        icon: 'fas fa-ban',
        path: '/dashboard/members/blocked-members',
        tooltip: 'View Blocked Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      // {
      //   label: 'CLOSED_MEMBERS',
      //   icon: 'fas fa-user-lock',
      //   path: '/dashboard/members/closed-members',
      //   tooltip: 'View Closed Members',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
      {
        label: 'ONLINE_REGISTERED_MEMBERS',
        icon: 'fas fa-user-check',
        path: '/dashboard/members/online-registered-members',
        tooltip: 'View Online Registered Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'DELETED_MEMBERS',
        icon: 'fas fa-trash',
        path: '/dashboard/members/deleted-members',
        tooltip: 'View Deleted Members',
        canView: ['admin', 'super_admin'],
      },
      {
        label: "OLD_ID'S_OF_RENEWED_MEMBERS",
        icon: 'fas fa-id-badge',
        path: '/dashboard/members/old-ids-of-renewed-members',
        tooltip: 'View Old IDs of Renewed Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'REPORTED_MEMBERS',
        icon: 'fas fa-flag',
        path: '/dashboard/members/reported-members',
        tooltip: 'View Reported Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'MATCHED_MEMBERS',
        icon: 'fas fa-heart',
        path: '/dashboard/members/matched-members',
        tooltip: 'View Matched Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'DEACTIVATED_MEMBERS',
        icon: 'fas fa-user-slash',
        path: '/dashboard/members/deactivated-members',
        tooltip: 'View Deactivated Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      // {
      //   label: 'CURRENT_MEMBERS',
      //   icon: 'fas fa-user-check',
      //   path: '/dashboard/members/current-members',
      //   tooltip: 'View Current Members',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
      // {
      //   label: 'PAST_MEMBERS',
      //   icon: 'fas fa-user-clock',
      //   path: '/dashboard/members/past-members',
      //   tooltip: 'View Past Members',
      //   canView: ['admin', 'super_admin', 'staff'],
      // },
      // {
      //   label: 'EXPIRED_MEMBERS',
      //   icon: 'fas fa-user-times',
      //   path: '/dashboard/members/expired-members',
      //   tooltip: 'View Expired Members',
      //   canView: ['admin', 'super_admin'],
      // },
      // {
      //   label: 'MEMBER_RENEWAL',
      //   icon: 'fas fa-redo',
      //   path: '/dashboard/members/renewal',
      //   tooltip: 'Renew Member Subscriptions',
      //   canView: ['admin', 'super_admin'],
      // },
    ],
  },


  // {
  //   label: 'PROFILES',
  //   items: [
  //     {
  //       label: 'ALL_PROFILES',
  //       icon: 'fas fa-id-card',
  //       path: '/dashboard/profiles/profiles',
  //       tooltip: 'View All Profiles',
  //       canView: ['admin', 'super_admin', 'staff'],
  //     },
  //     {
  //       label: 'ADD_PROFILE',
  //       icon: 'fas fa-user-plus',
  //       path: '/dashboard/profiles/add-profile',
  //       tooltip: 'Add New Profile',
  //       canView: ['admin', 'super_admin'],
  //     },
  //     {
  //       label: 'BLOCKED_PROFILES',
  //       icon: 'fas fa-user-slash',
  //       path: '/dashboard/profiles/blocked-profiles',
  //       tooltip: 'View Blocked Profiles',
  //       canView: ['admin', 'super_admin', 'staff'],
  //     },
  //     {
  //       label: 'FAKE_PROFILES',
  //       icon: 'fas fa-user-secret',
  //       path: '/dashboard/profiles/fake-profiles',
  //       tooltip: 'View Fake Profiles',
  //       canView: ['admin', 'super_admin', 'staff'],
  //     },
  //     {
  //       label: 'DELETED_PROFILES',
  //       icon: 'fas fa-user-times',
  //       path: '/dashboard/profiles/deleted-profiles',
  //       tooltip: 'View Deleted Profiles',
  //       canView: ['admin', 'super_admin'],
  //     },
  //   ],
  // },



  {
    label: 'MEMBERSHIP',
    icon: 'fas fa-id-card-alt',
    items: [
      {
        label: 'ALL_MEMBERSHIPS',
        icon: 'fas fa-user-friends',
        path: '/dashboard/membership/all',
        tooltip: 'View All Memberships',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Expired Memberships',
        icon: 'fas fa-user-slash',
        path: '/dashboard/membership/inactive',
        tooltip: 'View Inactive Memberships',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Active Memberships',
        icon: 'fas fa-user-check',
        path: '/dashboard/membership/active',
        tooltip: 'View Active Memberships',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'Cancelled Memberships',
        icon: 'fas fa-user-times',
        path: '/dashboard/membership/cancelled',
        tooltip: 'View Cancelled Memberships',
        canView: ['admin', 'super_admin', 'staff'],
      }
    ],
  },

  {
    label: 'ACTIVATION',
    icon: 'fas fa-user-check',
    items: [
      {
        label: 'ACTIVATION',
        icon: 'fas fa-user-check',
        path: '/dashboard/members/activation',
        tooltip: 'View All Activation Settings',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'PAYMENTS',
    icon: 'fas fa-credit-card',
    items: [
      {
        label: 'ALL_PAYMENTS',
        icon: 'fas fa-credit-card',
        path: '/dashboard/payments/all',
        tooltip: 'View All Payments',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'VIEW_PAYMENTS',
        icon: 'fas fa-file-invoice-dollar',
        path: '/dashboard/payments/view',
        tooltip: 'View Individual Payment Details',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'EXPORT_PAYMENTS',
        icon: 'fas fa-file-export',
        path: '/dashboard/payments/export',
        tooltip: 'Export Payments Report',
        canView: ['admin', 'super_admin'],
      },
    ],
  },

  {
    label: 'STORIES',
    icon: 'fas fa-book-open',
    items: [
      {
        label: 'STORIES',
        icon: 'fas fa-book-open',
        path: '/dashboard/stories',
        tooltip: 'View All Stories',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'MESSAGES',
    icon: 'fas fa-envelope',
    items: [
      {
        label: 'ALL_MESSAGES',
        icon: 'fas fa-envelope',
        path: '/dashboard/messages/all',
        tooltip: 'View All Messages',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'NEWSLETTER',
        icon: 'fas fa-newspaper',
        path: '/dashboard/messages/members',
        tooltip: 'View Messages from Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'EXPIRY_ALERT',
        icon: 'fas fa-bell',
        path: '/dashboard/messages/members',
        tooltip: 'View Messages from Members',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'SMS',
    icon: 'fas fa-sms',
    items: [
      {
        label: 'SEND_SMS',
        icon: 'fas fa-sms',
        path: '/dashboard/send-sms',
        tooltip: 'View All Messages',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'NEWS',
    icon: 'fas fa-newspaper',
    items: [
      {
        label: 'NEWS',
        icon: 'fas fa-newspaper',
        path: '/dashboard/messages/all',
        tooltip: 'View All Messages',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'REPORTS',
    icon: 'fas fa-file-alt',
    items: [
      {
        label: 'REPORTS',
        icon: 'fas fa-file-alt',
        path: '/dashboard/reports/search-report',
        tooltip: 'View All Messages',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'ACTIVITIES',
    icon: 'fas fa-tasks',
    items: [
      {
        label: 'MEMBERS_ACTIVITY',
        icon: 'fas fa-th',
        path: '/dashboard/activity/members-activity',
        tooltip: 'View Members Activity',
        show: true,
        canView: ['admin', 'super_admin', 'staff',],
      },
      {
        label: 'ADMIN_ACTIVITY',
        icon: 'fas fa-user-shield',
        path: '/dashboard/activity/admin-activity',
        tooltip: 'View Admin Activity',
        show: true,
        canView: ['admin', 'super_admin', 'staff',],
      }

    ],
  },

  {
    label: 'USERS_&_ROLES_MANAGEMENT',
    icon: 'fas fa-user-cog',
    items: [
      {
        label: 'ALL_USERS',
        icon: 'fas fa-users',
        path: '/dashboard/users/all-users',
        tooltip: 'View All Users',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'ALL_ROLES',
        icon: 'fas fa-user-tag',
        path: '/dashboard/roles/all-roles',
        tooltip: 'View All Roles',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'ADD_ROLE_PERMISSION',
        icon: 'fas fa-plus-circle',
        path: '/dashboard/roles/add-role',
        tooltip: 'Add New Role Permission',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'ALL_PERMISSIONS',
        icon: 'fas fa-key',
        path: '/dashboard/permissions/all',
        tooltip: 'View All Permissions',
        canView: ['admin', 'super_admin'],
      },
      // {
      //   label: 'Role & Permission',
      //   icon: 'fas fa-user-shield',
      //   path: '/dashboard/roles/role-permission',
      //   tooltip: 'Manage Roles & Permissions',
      //   canView: ['admin', 'super_admin'],
      // },
    ],
  },

  {
    label: 'STAFF_MANAGEMENT',
    icon: 'fas fa-user-tie',
    items: [
      {
        label: 'ALL_STAFFS',
        icon: 'fas fa-users',
        path: '/dashboard/staffs/all-staffs',
        tooltip: 'View All Staffs',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'ADD_NEW_STAFF',
        icon: 'fas fa-user-plus',
        path: '/dashboard/staffs/add-staff',
        tooltip: 'Add New Staff',
        canView: ['admin', 'super_admin'],
      },
      {
        label: 'PAST_STAFFS',
        icon: 'fas fa-user-clock',
        path: '/dashboard/staffs/past-staffs',
        tooltip: 'View Past Staffs',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },

  {
    label: 'HELP_&_SUPPORT',
    icon: 'fas fa-headset',
    items: [
      {
        label: 'CONTACT_BITS_SUPPORT',
        icon: 'fas fa-headset',
        path: '/dashboard/support/contact-support',
        tooltip: 'Contact BITS Support Team',
        canView: ['admin', 'super_admin', 'staff'],
      },
      {
        label: 'FAQ',
        icon: 'fas fa-question-circle',
        path: '/dashboard/support/help-center',
        tooltip: 'Frequently Asked Questions',
        canView: ['admin', 'super_admin', 'staff'],
      },
    ],
  },
];
