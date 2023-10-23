import Books from "@/components/Admin/Book/BookManagement.vue";
import CreateBook from "@/components/Admin/Book/CreateBook.vue";
import DeleteBook from "@/components/Admin/Book/DeleteBook.vue";
import UpdateBook from "@/components/Admin/Book/UpdateBook.vue";
import ViewBook from "@/components/Admin/Book/ViewBook.vue";
import AdminDash from "@/components/Admin/AdminDash.vue";
import ErrorPage from "@/components/Main/ErrorPage.vue";
import books from "@/components/Admin/Book/BookManagement.vue";
import BookManagement from "@/components/Admin/Book/BookManagement.vue";

const adminBookRoutes = [
    {
        path: 'books',
        components: {
            adminContent: BookManagement,
        },
    },
    {
        path: 'books/create',
        components: {
            adminContent: CreateBook,
        },
    },
    {
        path: 'books/update',
        components: {
            adminContent: UpdateBook,
        },
    },
    {
        path: 'books/delete',
        components: {
            adminContent: DeleteBook,
        },
    },
    {
        path: 'books/read/:id',
        name: 'ViewCar',
        components: {
            adminContent: ViewBook,
        },
    },
    {
        path: 'dashboard',
        name: 'Dashboard',
        components: { adminContent: AdminDash,
        },
    },
    {   path: '/admin/:pathMatch(.*)*',
        name: 'AdminErrorPage',
        components: { adminContent: ErrorPage }
    },


    ///////////////////////////////



];

export default adminBookRoutes;
