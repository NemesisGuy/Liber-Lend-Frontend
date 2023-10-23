import ReservationManagement from "@/components/Admin/Reservation/ReservationManagement.vue";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation.vue";
import ViewReservation from "@/components/Admin/Reservation/ViewReservation.vue";

const adminReservationRoutes = [
    {
        path: 'reservations',
        components: {
            adminContent: ReservationManagement,
        },
    },
    {
        path: 'reservations/create',
        components: {
            adminContent: CreateReservation,
        },
    },
    {
        path: 'reservations/read/:id',
        name: 'ViewReservation',
        components: {
            adminContent: ViewReservation,
        },
    },
];

export default adminReservationRoutes;
