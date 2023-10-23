<template>
  <div class="container">
    <div class="content-container">
      <div class="rental-container">
        <h1>Rent Book</h1>
        <div v-if="selectedBook" class="book-details">
          <p><strong>ID:</strong> {{ selectedBook.id }}</p>
          <p><strong>Title:</strong> {{ selectedBook.title }}</p>
          <p><strong>Author:</strong> {{ selectedBook.author }}</p>
          <p><strong>Genre:</strong> {{ selectedBook.genre }}</p>
          <p><strong>ISBN:</strong> {{ selectedBook.ISBN }}</p>
          <p><strong>Edition:</strong> {{ selectedBook.edition }}</p>
        </div>
        <div class="user-container">
          <h2>User Details</h2>
          <div v-if="user" class="user-details">
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>User Name:</strong> {{ user.userName }}</p>
            <p><strong>First Name:</strong> {{ user.firstName }}</p>
            <p><strong>Last Name:</strong> {{ user.lastName }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phoneNumber }}</p>
          </div>
        </div>
        <button v-if="selectedBook" class="rent-button" @click="showConfirmationModal = true">Confirm Rental</button>
      </div>
    </div>
  </div>
  <SuccessModal v-if="successModal.show" @close="closeModal" :show="successModal.show" :message="successModal.message"></SuccessModal>
  <FailureModal
      key="failModal"
      v-if="failModal.show"
      @close="closeModal"
      @cancel="closeModal"
      :show="failModal.show"
      :message="failModal.message || errorMessage"
  ></FailureModal>

  <LoadingModal v-if="loading" show />
  <ConfirmationModal
      v-if="showConfirmationModal"
      @confirm="confirmRental"
      @cancel="closeModal"
      :show="showConfirmationModal"
  >
    <p>{{ confirmationMessage }}</p>
    <p>Are you sure you want to confirm this rental?</p>
    <p>User: {{ user.userName }} {{ user.email }}</p>
    <p>Book: {{ selectedBook.title }} ({{ selectedBook.author }})</p>
    <p>Price: R {{ getPricePerDay(selectedBook.genre) }} per day</p>
  </ConfirmationModal>
</template>

<script>
import axios from 'axios';
import ConfirmationModal from '@/components/Main/Modals/ConfirmationModal.vue';
import LoadingModal from '@/components/Main/Modals/LoadingModal.vue';
import SuccessModal from '@/components/Main/Modals/SuccessModal.vue';
import FailureModal from '@/components/Main/Modals/FailureModal.vue';

export default {
  name: 'Rental',
  components: {
    ConfirmationModal,
    LoadingModal,
    SuccessModal,
    FailureModal,
  },
  data() {
    return {
      selectedBook: null,
      user: null,
      showConfirmationModal: false,
      confirmationMessage: '',
      successModal: {
        show: false,
        message: '',
      },
      failModal: {
        show: false,
        message: '',
      },
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.loading = true;
        await Promise.all([this.getSelectedBook(), this.getUserDetails()]);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error('Error retrieving data:', error);
        this.failModal.show = true;
        this.failModal.message = 'Error retrieving data';
      }
    },
    getPricePerDay(genre) {
      const rentalPrices = {
        NOVEL: 10,
        THRILLER: 15,
        FANTASY: 20,
        ROMANCE: 12,
        SCIENCE_FICTION: 18,
        MYSTERY: 14,
        HISTORICAL_FICTION: 16,
        OTHER: 10,
      };
      return rentalPrices[genre];
    },
    async getSelectedBook() {
      try {
        const bookId = this.$route.params.bookId;
        const response = await axios.get(`http://localhost:8080/api/admin/books/read/${bookId}`);
        this.selectedBook = response.data;
      } catch (error) {
        console.error('Error retrieving book:', error);
        this.failModal.show = true;
        this.failModal.message = 'Error retrieving book';
      }
    },
    async getUserDetails() {
      try {
        const userId = 1; // Replace with the actual user ID from Vuex or other source
        const response = await axios.get(`http://localhost:8080/api/admin/users/read/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error retrieving user:', error);
      }
    },
    confirmRental() {
      this.showConfirmationModal = false;
      this.confirmationMessage = `Are you sure you want to confirm this rental? ${this.selectedBook.title} ${this.user.name}`;
      this.loading = true;

      const rentalData = {
        book: this.selectedBook,
        user: this.user,
        issuer: this.user.id,
        receiver: null,
        fine: 0,
        finePayed: 0,
        issuedDate: new Date(),
        returnedDate: null,
      };

      axios.post('http://localhost:8080/api/admin/rentals/create', rentalData)
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              this.loading = false;
              this.successModal.show = true;
              this.successModal.message = 'Rental confirmed successfully!';
            } else {
              console.log(response);
              this.loading = false;
              this.failModal.show = true;
              this.failModal.message = 'Failed to confirm rental';
            }
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
            this.failModal.show = true;
            this.failModal.message = error.response.data || 'An error occurred while confirming the rental.';
          });
    },

    closeModal() {
      this.showConfirmationModal = false;
      this.successModal.show = false;
      this.failModal.show = false;
    },
  },
};
</script>

<style scoped>
.rental-container {
  margin-top: 20px;
}

.book-details {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 20px;
  color: black;
}

.user-details {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 20px;
  color: black;
}
</style>
