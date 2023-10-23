import { createRouter, createWebHistory } from 'vue-router';
import AdminPage from "@/components/Admin/AdminPage2.vue";
import ConfirmationModal from "@/components/Main/Modals/ConfirmationModal.vue";
import adminRoutes from './adminRoutes';
import adminBookRoutes from './adminBookRoutes';
import adminUserRoutes from './adminUserRoutes';
import navRoutes from './navRoutes';
import BookList from "@/components/Main/Book/BookList.vue";
import Home from "@/components/Main/Home.vue";
import bookRoutes from './bookRoutes';
import UserProfile from "@/components/Main/UserProfile.vue";
import Test from "@/components/Main/TestPage.vue";
import TestPage from "@/components/Main/TestPage.vue";
import adminRentalRoutes from "@/router/adminRentalRoutes";
import Rental from "@/components/Main/Rental/Rental.vue";
import ReturnRental from "@/components/Main/Rental/ReturnRental.vue";
import CreateRental from "@/components/Admin/Rental/CreateRental.vue";
import Login from "@/components/Main/Login.vue";
import Signup from "@/components/Main/Signup.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...navRoutes,
       ...bookRoutes,
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/rental/:bookId',
            name: 'Rental',
            component: Rental,
        },
        {
            path: '/rental/return/:rentalId',
            name: 'ReturnRental',
            component: ReturnRental,
        },
      /*  {
            path: '/rental/create/',
            name: 'CreateRental',
            component: CreateRental,
        },*/


        {
            path: '/books/list/:genre/:available',
            name: 'BookList',
            component: BookList,
        },

    /*    {
            path: '/register',
            name: 'Register',
            component: Signup,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },*/

        {
            path: '/user/profile/:id',
            name: 'UserProfile',
            component: UserProfile,
        },
        {
            path: '/admin',
            component: AdminPage,
            children: [
                ...adminRoutes,
                ...adminBookRoutes,
                ...adminUserRoutes,
                ...adminRentalRoutes,
            ],
        },


        {
            path: '/error',
            component: () => import('@/components/Main/ErrorPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'ErrorPage',
            component: () => import('@/components/Main/ErrorPage.vue'),
        },
    ],
});

export default router;
