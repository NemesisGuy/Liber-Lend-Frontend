<template>
  <div class="content-container">
    <div class="content-header">
      <h1>
        <i class="fas fa-file-contract"></i> Reservation Management
      </h1>
      <div class="search-bar-container">
        <div class="search-bar">
          <div class="search-input">
            <input v-model="searchQuery" placeholder="Search..." type="text" />
            <button @click="resetSearch" class="read-button button">
              <i class="fas fa-search"></i> Reset
            </button>
          </div>
          <router-link to="/admin/reservations/create" class="add-button button">
            <i class="fas fa-book"></i> Add Reservation
          </router-link>
        </div>
      </div>
    </div>
    <table>
      <thead>
      <tr>
        <th @click="sortReservations('reservationId')">Reservation ID <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('user.userName')">User <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('user.firstName')">First Name <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('user.lastName')">Last Name <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('book.title')">Book Title <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('book.author')">Author <i class="fas fa-sort"></i></th>
        <th @click="sortReservations('dateReserved')">Date Reserved </th>
        <th class="actions-column">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reservation in filteredReservations" :key="reservation.reservationId">
        <td v-if="!reservation.editing">{{ reservation.reservationId }}</td>
        <td v-else>
          <input type="text" v-model="reservation.reservationId">
        </td>
        <td v-if="!reservation.editing">{{ reservation.user.userName }}</td>
        <td v-else>
          <input type="text" v-model="reservation.user.userName">
        </td>
        <td v-if="!reservation.editing">{{ reservation.user.firstName }}</td>
        <td v-else>
          <input type="text" v-model="reservation.user.firstName">
        </td>
        <td v-if="!reservation.editing">{{ reservation.user.lastName }}</td>
        <td v-else>
          <input type="text" v-model="reservation.user.lastName">
        </td>
        <td v-if="!reservation.editing">{{ reservation.book.title }}</td>
        <td v-else>
          <input type="text" v-model="reservation.book.title">
        </td>
        <td v-if="!reservation.editing">{{ reservation.book.author }}</td>
        <td v-else>
          <input type="text" v-model="reservation.book.author">
        </td>
        <td v-if="!reservation.editing">{{ reservation.dateReserved }}</td>
        <td>
          <div v-if="!reservation.editing">
            <button @click="editReservation(reservation)" class="update-button button">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteReservation(reservation.reservationId)" class="delete-button button">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
            <button @click="openReservationView(reservation.reservationId)" class="read-button button">
              <i class="fas fa-eye"></i> View
            </button>
          </div>
          <div v-else>
            <button @click="saveReservation(reservation)" class="accept-button button">
              <i class="fas fa-save"></i> Save
            </button>
            <button @click="cancelEdit(reservation)" class= "cancel-button button">
            <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading">Loading...</div>
    <loading-modal v-if="loading" show></loading-modal>
    <confirmation-modal
        :show="showConfirmationModal"
        @confirm="confirmDeleteReservation"
        @cancel="cancelDeleteReservation"
    >
      <template v-if="reservationToDelete">
        <div>
          <p>Are you sure you want to delete this reservation?</p>
          <hr>
          <h3>Reservation Details:</h3>
          <p>User: {{ reservationToDelete.user.userName }}</p>
          <p>Book Title: {{ reservationToDelete.book.title }}</p>
          <hr>
          <p><b>Warning!!!</b> This action cannot be undone.</p>
        </div>
      </template>
    </confirmation-modal>
    <SuccessModal v-if="successModal.show" @close="closeModal" @cancel="closeModal" :show="successModal.show" :message="successModal.message"></SuccessModal>
    <FailureModal v-if="failModal.show" @close="closeModal" @cancel="closeModal" :show="failModal.show" :message="failModal.message"></FailureModal>
  </div>
</template>

<script>
import axios from "axios";
import ConfirmationModal from "../../Main/Modals/ConfirmationModal.vue";
import LoadingModal from "@/components/Main/Modals/LoadingModal.vue";
import SuccessModal from "@/components/Main/Modals/SuccessModal.vue";
import FailureModal from "@/components/Main/Modals/FailureModal.vue";
import process from "process";
import baseURL from "@/api.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export default {
  name: "ReservationManagement",
  components: {
    ConfirmationModal,
    LoadingModal,
    SuccessModal,
    FailureModal,
  },
  data() {
    return {
      reservations: [],
      sortedReservationsList: [],
      sortBy: null,
      searchQuery: "",
      loading: false,
      showConfirmationModal: false,
      reservationToDelete: null,
      successModal: {
        show: false,
        message: "",
      },
      failModal: {
        show: false,
        message: "",
      },
    };
  },
  methods: {
    getReservations() {
      this.loading = true;
      axios
          .get(`http://localhost:8080/api/admin/reservations/list/all`)
          .then((response) => {
            this.reservations = response.data;
            this.sortedReservationsList = [...this.reservations];
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.showFailureModal("Failed to fetch reservations. Please try again.");
          });
    },
    sortReservations(sortKey) {
      if (this.sortedReservationsList.length === 0) {
        return;
      }

      const currentSortKey = this.sortedReservationsList[0]._sortKey;
      let sortOrder = "asc";

      if (currentSortKey === sortKey && this.sortedReservationsList[0]._sortOrder === "asc") {
        sortOrder = "desc";
      }

      this.sortedReservationsList.sort((a, b) => {
        const valueA = this.getPropertyValue(a, sortKey);
        const valueB = this.getPropertyValue(b, sortKey);

        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });

      this.sortedReservationsList.forEach((reservation) => {
        reservation._sortKey = sortKey;
        reservation._sortOrder = sortOrder;
      });
    },
    getPropertyValue(object, key) {
      const keys = key.split(".");
      let value = object;
      for (const k of keys) {
        value = value[k];
      }
      return value;
    },
    deleteReservation(reservation) {
      this.reservationToDelete = reservation;
      this.showConfirmationModal = true;
    },
    confirmDeleteReservation() {
      if (this.reservationToDelete) {
        const reservationId = this.reservationToDelete.id;
        this.loading = true;
        axios
            .delete(`http://localhost:8080/api/admin/reservations/delete/${reservationId}`) // Update the API URL to delete reservations
            .then(() => {
              this.showSuccessModal("Reservation deleted successfully.");
              this.getReservations();
            })
            .catch((error) => {
              this.loading = false;
              this.showFailureModal("Failed to delete reservation. Please try again.");
            });
      }
      this.reservationToDelete = null;
      this.showConfirmationModal = false;
    },
    cancelDeleteReservation() {
      this.reservationToDelete = null;
      this.showConfirmationModal = false;
    },

    editReservation(reservation) {
      reservation.editing = true;
    },

    saveReservation(reservation) {
      reservation.reservationId = reservation.id;
      reservation.dateReserved = reservation.dateReserved;
      reservation.dateReturned = reservation.dateReturned;

      axios
          .put(`http://localhost:8080/api/admin/reservations/update/${reservation.reservationId}`, reservation)
          .then((response) => {
            this.loading = false;
            this.showSuccessModal("Reservation updated successfully.");
            console.log(response);
            // this.getReservations();
          })
          .catch((error) => {
            this.loading = false;
            this.showFailureModal("Failed to update reservation. Please try again.");
          });
    },

    cancelEdit(reservation) {
      reservation.editing = false;
    },

    openReservationView(reservationId) {
      this.$router.push(`/admin/reservations/read/${reservationId}`);
    },

    resetSearch() {
      this.searchQuery = "";
      this.sortedReservationsList = this.reservations;
    },

    showSuccessModal(message) {
      this.successModal = {
        show: true,
        message: message,
      };
    },

    showFailureModal(message) {
      this.failModal = {
        show: true,
        message: message,
      };
    },

    closeModal() {
      this.successModal.show = false;
      this.failModal.show = false;
    },

    searchNestedProperty(obj, query) {
      for (const key in obj) {
        if (typeof obj[key] === "string" && obj[key].toLowerCase().includes(query)) {
          return true;
        }
      }
      return false;
    },

    updateSortOption(option) {
      this.sortBy = option;
    },
  },
  computed: {
    sortedReservationsList() {
      if (this.sortBy) {
        const sorted = [...this.reservations];
        sorted.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
        return sorted;
      }
      return this.reservations;
    },
    filteredReservations() {
      const query = this.searchQuery.toLowerCase();
      return this.sortedReservationsList.filter((reservation) => {
        for (const key in reservation) {
          if (typeof reservation[key] === "string" && reservation[key].toLowerCase().includes(query)) {
            return true;
          }
          if (typeof reservation[key] === "object" && this.searchNestedProperty(reservation[key], query)) {
            return true;
          }
        }
        return false;
      });
    },
  },
  created() {
    this.getReservations();
  },
};
</script>

<style>

</style>
