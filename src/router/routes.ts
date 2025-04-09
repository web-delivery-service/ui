

const routes = [
    {
        name: 'Auth',
        path: '/auth',
        component: () => import('../layouts/AuthLayout.vue'),
        children: [
            {
                name: 'Login',
                path: 'login',
                component: () => import('../views/auth/LoginView.vue'),
            },
            {
                name: 'Register',
                path: 'register',
                component: () => import('../views/auth/RegisterView.vue'),
            },
        ],
    },
    {
        name: 'Home',
        path: '/',
        component: () => import('../layouts/UserLayout.vue'),
        children: [
            {
                name: 'Profile',
                path: 'profile',
                component: () => import('../views/ProfileView.vue'),
            },
            {
                name: 'Catalog',
                path: 'catalog',
                component: () => import('../views/CatalogView.vue'),
            },
            {
                name: 'Cart',
                path: 'cart',
                component: () => import('../views/CartView.vue'),
            },
            {
                name: 'UserOrders',
                path: 'orders',
                component: () => import('../views/OrdersView.vue'),
            }
        ]
    },
    {
        name: 'AdminPanel',
        path: '/admin',
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
            {
                name: 'Categories',
                path: 'categories',
                component: () => import('../views/admin/CategoryView.vue'), 
            },
            {
                name: 'Products',
                path: 'products',
                component: () => import('../views/admin/ProductView.vue'), 
            },
            {
                name: 'Orders',
                path: 'orders',
                component: () => import('../views/admin/OrderView.vue'), 
            },
            {
                name: 'Stats',
                path: 'stats',
                component: () => import('../views/admin/StatsView.vue'), 
            }
        ]
    }
];

export default routes;