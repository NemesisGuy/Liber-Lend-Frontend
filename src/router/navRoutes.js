import Home from "@/components/Main/Home.vue";
import CarList from "@/components/Main/Book/BookList.vue";
import Login from "@/components/Main/User/Login.vue";
import Signup from "@/components/Main/User/Signup.vue";
import BookCovers from "@/components/Main/Book/BookCovers.vue";

const navRoutes = [

    {
        path: '/nav/user/login/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/nav/user/logout/',
        redirect: '/'
    },
    {
        path: '/nav/user/signup/',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/nav/books/details/cover/:isbn',
        name: 'BookCovers',
        component: BookCovers,

    },

    {
        path: '/nav/user/profile/',
        redirect: '/'
    },

    {
        path: "/signout",
        name: "SignOut",
        component: SignOut,
    },

];

export default navRoutes;
