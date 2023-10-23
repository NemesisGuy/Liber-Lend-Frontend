import Cars from "@/components/Admin/Book/BookManagement.vue";
import CreateCar from "@/components/Admin/Book/CreateBook.vue";
import DeleteCar from "@/components/Admin/Book/DeleteBook.vue";
import UpdateCar from "@/components/Admin/Book/UpdateBook.vue";
import ViewCar from "@/components/Admin/Book/ViewBook.vue";
import AdminDash from "@/components/Admin/AdminDash.vue";
import ErrorPage from "@/components/Main/ErrorPage.vue";
import users from "@/components/Admin/User/UserManagement.vue";
import cars from "@/components/Admin/Book/BookManagement.vue";
import CarManagment from "@/components/Admin/Book/BookManagement.vue";
import RentalManagement from "@/components/Admin/Rental/RentalManagement.vue";
import TestPage from "@/components/Main/TestPage.vue";
import ReturnRental from "@/components/Main/Rental/ReturnRental.vue";
import CreateRental from "@/components/Admin/Rental/CreateRental.vue";

const adminRoutes = [
    {
        path: 'admin',
        components: {
            adminContent: AdminDash,
        }
    },
    {
        path: '/admin/test',
        components: {
            adminContent: TestPage,
        }
    }



    ///////////////////////////////



];

export default adminRoutes;
