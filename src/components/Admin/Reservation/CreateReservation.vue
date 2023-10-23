<template xmlns="http://www.w3.org/1999/html">
  <div class="card-container">
    <div class="form-container">
      <LoadingModal v-if="loadingModal.show" :show="loadingModal.show"></LoadingModal>

      <form ref="reservationForm" @submit.prevent="createReservation">
        <div class="form-header">
          <h2>Create Reservation</h2>
        </div>

        <div class="form-group">
          <label for="user">User:</label>
          <select id="user" v-model="selectedUser" name="userId">
            <option v-for="user in users" :key="user.id" :value="user.id">
              User ID: {{ user.id }} Email: {{ user.email }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="reservationDate">Reservation Date:</label>
          <input id="reservationDate" v-model="selectedReservationDate" name="reservationDate" type="datetime-local">
        </div>

        <div class="form-group">
          <label for="book">Book:</label>
          <select id="book" v-model="selectedBook" name="bookId">
            <option v-for="book in books" :key="book.id" :value="book.id">
              Book ID: {{ book.id }} Title: {{ book.title }} Author: {{ book.author }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <div class="button-container">
            <button class="confirm-button button" type="submit"><i class="fas fa-check"></i> Confirm</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="modal-body">
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <confirmation-modal
        key="confirmationModal"
        :show="showConfirmationModal"
        @cancel="cancel"
        @confirm="confirm"
    >
      <template v-if="showConfirmationModal">
        <div>
          <h3>Confirmation</h3>
          <p>Are you sure you want to create this Reservation?</p>
          <hr>
          <p>User ID: {{ selectedUser }}</p>
          <p>Reservation Date: {{ selectedReservationDate }}</p>
          <p>Book ID: {{ selectedBook }}</p>
          <hr>
          <p><b>Warning!!!</b> This action cannot be undone.</p>
        </div>
      </template>
    </confirmation-modal>

    <SuccessModal
        v-if="successModal.show"
        key="successModal"
        :message="successModal.message"
        :show="successModal.show"
        @cancel="closeModal"
        @close="closeModal"
        @confirm="closeModal"
        @ok="closeModal"
    ></SuccessModal>

    <FailureModal
        v-if="failModal.show"
        key="failModal"
        :message="failModal.message"
        :show="failModal.show"
        @cancel="closeModal"
        @close="closeModal"
    ></FailureModal>
  </div>
</template>


<script>
import axios from "axios";
import SuccessModal from "@/components/Main/Modals/SuccessModal.vue";
import FailureModal from "@/components/Main/Modals/FailureModal.vue";
import LoadingModal from "@/components/Main/Modals/LoadingModal.vue";
import ConfirmationModal from "@/components/Main/Modals/ConfirmationModal.vue";

export default {
  computed: {
    confirmationModal() {
      return ConfirmationModal;
    }
  },
  data() {
    return {
      users: [],
      books: [],
      selectedUser: "",
      selectedBook: "",
      selectedReservationDate: "",
      confirm: null,
      cancel: null,
      loadingModal: {
        show: false,
      },
      errorMessage: "",
      showConfirmationModal: false,
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

  components: {
    ConfirmationModal,
    SuccessModal,
    FailureModal,
    LoadingModal,
  },
  mounted() {
    this.fetchUsersList();
    this.fetchBooksList();
  },
  methods: {
    fetchUsersList() {
      this.loadingModal.show = true;
      axios
          .get("http://localhost:8080/api/admin/users/list/all")
          .then((response) => {
            this.users = response.data;
            this.loadingModal.show = false;
          })
          .catch((error) => {
            console.log(error);
            this.failModal.message = "Failed to fetch users list";
            this.failModal.show = true;
            this.loadingModal.show = false;
          })
          .finally(() => {
            this.loadingModal.show = false;
          });
    },

    fetchBooksList() {
      this.loadingModal.show = true;
      axios
          .get("http://localhost:8080/api/admin/books/all")
          .then((response) => {
            this.books = response.data;
            this.loadingModal.show = false;
          })
          .catch((error) => {
            console.log(error);
            this.failModal.message = "Failed to fetch books list";
            this.failModal.show = true;
            this.loadingModal.show = false;
          })
          .finally(() => {
            this.loadingModal.show = false;
          });
    },


    createReservation() {
      this.loadingModal.show = false;
      this.errorMessage = "";

      const reservation = {
        user: {
          id: this.selectedUser,
        },
        book: {
          id: this.selectedBook,
        },
        reservationDate: this.selectedReservationDate,
      };

      this.showConfirmationModal = true;

      this.confirm = () => {
        this.loadingModal.show = true;
        this.showConfirmationModal = false;

        axios
            .post("http://localhost:8080/api/admin/reservations/create", reservation)
            .then((response) => {
              if (response && response.data) {
                console.log("Reservation created successfully");
                this.successModal.message =
                    "Reservation created successfully:\n" +
                    `User: ${response.data.user.email}.\n` +
                    `Book: ${response.data.book.title} by ${response.data.book.author}.\n` +
                    `Reservation Date: ${response.data.reservationDate}.\n`;
                this.successModal.show = true;
              } else {
                console.error("Response or response.data is undefined");
              }
            })
            .catch((error) => {
              console.log(error);
              this.errorMessage = error.response.data;
              this.failModal.show = true;
            })
            .finally(() => {
              this.loadingModal.show = false;
            });
      };

      this.cancel = () => {
        this.loadingModal.show = false;
        this.showConfirmationModal = false;
      };
    },

    closeModal() {
      this.successModal.show = false;
      this.failModal.show = false;
      this.showConfirmationModal = false;
    },
  },
};
</script>
