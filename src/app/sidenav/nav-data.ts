import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'clients',
        icon: 'fal fa-users',
        label: 'Clients'
    },
    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label: 'Products',
        items: [
            {
                routeLink: 'products/list-products',
                label: 'List Products',
            },
            {
                routeLink: 'products/stock-products',
                label: 'Stock Management',
            }
        ]
    },
    {
        routeLink: 'orders',
        icon: 'fal fa-plus',
        label: 'Orders'
    },
    {
        routeLink: 'invoices',
        icon: 'fal fa-file-invoice-dollar',
        label: 'Invoices'
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Statistics'
    },
    {
        routeLink: 'suppliers',
        icon: 'fal fa-user-tag',
        label: 'Supplier'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },


];