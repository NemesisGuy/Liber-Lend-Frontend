//import Vue from 'vue';
// noinspection JSValidateTypes

//import VueRouter from '../router';
import {createRouter, createWebHistory} from 'vue-router';

//import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Home from "@/components/Home.vue";
import LandingPage from "@/components/LandingPage.vue";
import UpdateUser from "@/components/Admin/User/UpdateUser.vue";
import UserList from "@/components/Admin/User/UserList.vue";
import SelectUser from "@/components/Admin/User/SelectUser.vue";
import DeleteUser from "@/components/Admin/User/DeleteUser.vue";
import ViewUser from "@/components/Admin/User/ViewUser.vue";
import CreateUser from "@/components/Admin/User/CreateUser.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import AdminPage from "@/components/Admin/AdminPage.vue";
import DeleteBook from "@/components/Admin/Book/DeleteBook.vue";
import CreateBook from "@/components/Admin/Book/CreateBook.vue";
import UpdateBook from "@/components/Admin/Book/UpdateBook.vue";
import SelectBook from "@/components/Admin/Book/SelectBook.vue";
import ViewBook from "@/components/Admin/Book/ViewBook.vue";
import BookList from "@/components/Admin/Book/BookList.vue";

// noinspection JSCheckFunctionSignatures


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: Home},
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},
        {path: '/', component: LandingPage},
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
        },
        {
            path: '/admin/users/create',
            name: 'CreateUser',
            component: CreateUser,
        },
        {
            path: '/admin/users/read',
            name: 'ViewUser',
            component: ViewUser,
        },
        {
            path: '/admin/users/select',
            name: 'SelectUser',
            component: SelectUser,
        },
        {
            path: '/admin/users/:category',
            name: 'UserList',
            component: UserList,
        },
        {
            path: '/admin/users/update',
            name: 'UpdateUser',
            component: UpdateUser,
        },
        {
            path: '/admin/users/delete',
            name: 'DeleteUser',
            component: DeleteUser,
        },
        {
            path: '/admin/books/delete',
            name: 'DeleteBook',
            component: DeleteBook,
        },
        {
            path: '/admin/books/create',
            name: 'CreateBook',
            component: CreateBook,
        },
        {
            path: '/admin/books/update',
            name: 'UpdateBook',
            component: UpdateBook,
        },
        {
            path: '/admin/books/select',
            name: 'SelectBook',
            component: SelectBook,
        },
        {
            path: '/admin/books/read',
            name: 'ViewBook',
            component: ViewBook,
        },
        {
            path: '/api/books/:category',
            name: 'BookList',
            component: BookList,
        },
        {
            path: '/error',

            component: ErrorPage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'ErrorPage',
            component: ErrorPage,
        }

    ]
});


export default router;
