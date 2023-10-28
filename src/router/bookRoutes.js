import Home from "@/components/Main/Home.vue";
import BookList from "@/components/Main/Book/BookList.vue";
import Login from "@/components/Main/User/Login.vue";
import Signup from "@/components/Main/User/Signup.vue";

const bookRoutes = [

    {
        path: '/book/var',
        name: '',
        component: BookList,
    },

];

export default bookRoutes;
