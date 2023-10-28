import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Main/HomePage.vue';
import CustomerList from '@/components/Main/CustomerList.vue';
import Home from "@/components/Main/Home.vue";
import ErrorPage from '@/components/Main/ErrorPage.vue';
import Signup from "@/components/Main/User/Signup.vue";
import Login from "@/components/Main/User/Login.vue";
import AdminPage from "@/components/Admin/AdminPage2.vue";
import ConfirmationModal from "@/components/Main/Modals/ConfirmationModal.vue";
import adminRoutes from './adminRoutes';
import adminBookRoutes from './adminBookRoutes';
import adminUserRoutes from './adminUserRoutes';

const router2 = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: Home,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/customers',
            name: 'CustomerList',
            component: CustomerList,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/error',
            component: ErrorPage,
        },
        {
            path: "/admin",
            component: AdminPage,
            children: [
                ...adminRoutes,
                ...adminBookRoutes,
                ...adminUserRoutes,
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'ErrorPage',
            component: ErrorPage,
        },
    ],
});

export default router2;
