# `lib/` Folder Structure

```
lib/
├── core/                    # Global reusable services, guards, interceptors, auth, rbac, base logic
│   ├── auth/                # Login handling, tokens, session, etc.
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── services/            # BaseHttpService, StorageService, etc.
│   ├── rbac/                # Role & permission logic (can consume from project-specific config)
│   └── utils/               # Pure helpers (formatDate, deepClone, etc.)
│
├── components/              # Reusable UI components (cards, modals, dropdowns, inputs)
│   ├── inputs/              # TextInput, DateInput, etc.
│   ├── buttons/             # BitsButton, IconButton, etc.
│   ├── tables/              # Reusable data table, billing table
│   └── feedback/            # Alerts, Toasts, Spinners, etc.
│
├── layouts/                 # Page layouts (dashboard, auth layout, split-screen, etc.)
│
├── features/                # Complex logic + UI combos (e.g., product form, checkout flow)
│   ├── billing-table/       # Smart billing table feature (form + table)
│   ├── rbac-user-settings/  # Feature using RBAC + settings
│   └── shop-switcher/       # For multi-shop switching logic
│
├── domain/                  # UX flows tied to business domain (not project-specific)
│   ├── product/             # Product UI cards, mappers, maybe validation
│   ├── customer/            # Customer list/filter/mapper
│   └── staff/               # Staff UI, maybe analytics card
│
├── models/                  # Common global models, enums, interfaces
│   ├── product.model.ts
│   ├── user.model.ts
│   └── order.model.ts
│
├── styles/                  # Global SCSS, theme tokens, Tailwind config overrides (if used)
│
├── project-specific/        # Anything tightly coupled to `store-app`, etc.
│   └── clothing-store/
│
├── pages/                   # Reusable generic pages (404, Login, Empty State, etc.)
│
├── animations/              # Common animations or animation configs
│
├── hooks/                   # Reusable RxJS-based hooks / composables (if any)
│
├── assets/                  # Fonts, icons, svg loaders, placeholder images
│
└── payment/                 # Payment integrations like Razorpay (logic + UI)
    └── razorpay/
```

> **Tip:**  
> Organize shared logic and UI in `core/` and `components/`.  
> Place business/domain-specific flows in `domain/` and `features/`.  
> Use `project-specific/` for code tightly coupled to a particular app.

/\*\*

- This code defines a selection of code to be documented.
- Please provide the actual code selection for specific documentation.
  \*/
