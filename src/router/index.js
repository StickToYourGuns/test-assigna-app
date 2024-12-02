import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '@/views/ProductsView.vue';
import AuthView from '@/views/AuthView.vue';

const routes = [
    {
        path: '/',
        redirect: '/products',
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView,
        meta: { isAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: AuthView,
        meta: { isAuth: false },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuth = !!localStorage.getItem('access_token');
    if (to.meta.isAuth && !isAuth) {
        next('/login');
    } else if (to.name === 'login' && isAuth) {
        next('/');
    } else {
        next();
    }
});

export default router;