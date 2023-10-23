import Home from "@/components/Main/Home.vue";
import BookList from "@/components/Main/Book/BookList.vue";
import Login from "@/components/Main/Login.vue";
import Signup from "@/components/Main/Signup.vue";

const bookRoutes = [

    {
        path: '/book/var',
        name: '',
        component: BookList,
    },

];

export default bookRoutes;
