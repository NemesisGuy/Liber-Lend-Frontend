<template>
  <div class="card-container">

    <div v-if="loading" class="loading">Loading...</div>
    <loading-modal v-if="loading" show></loading-modal>
    <div class="rental-profile">
      <div class="profile-header">
        <h1><i class="fas fa-book-reader"></i> Book Rental Profile</h1>

        <hr>
      </div>
      <div class="profile-details" v-if="rental && user && book">
        <!-- Rental Details Table -->
        <h3 class="table-heading"><i class="fas fa-file-contract"></i> Rental Details:</h3>

        <table>
          <tr><th>Label : </th> <th>Details : </th>  </tr>
          <tr>
            <td>Rental ID:</td>
            <td>{{ rental.id }}</td>
          </tr>
          <tr>
            <td>Rental Date:</td>
            <td>{{ rental.issuedDate }}</td>
          </tr>
          <tr>
            <td>Return Date:</td>
            <td>{{ rental.returnedDate }}</td>
          </tr>
          <tr>
            <td>Fine:</td>
            <td>{{ rental.fine }}</td>
          </tr>
        </table>

        <hr>

        <!-- Customer Details Table -->
        <h3 class="table-heading"><i class="fas fa-users"></i> Customer Details:</h3>
        <table>
          <tr><th>Label : </th> <th>Details : </th>  </tr>
          <tr>
            <td>Customer Name:</td>
            <td>{{ user.userName }}</td>
          </tr>
          <tr>
            <td>Customer First Name:</td>
            <td>{{ user.firstName }}</td>
          </tr>
          <tr>
            <td>Customer Last Name:</td>
            <td>{{ user.lastName }}</td>
          </tr>
          <tr>
            <td>Customer Email:</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td>Customer Phone Number:</td>
            <td>{{ user.phoneNumber }}</td>
          </tr>
        </table>

        <hr>

        <!-- Book Details Table -->
        <h3 class="table-heading"><i class="fas fa-book"></i> Book Details:</h3>
        <table>
          <tr><th>Label : </th> <th>Details : </th>  </tr>
          <tr>
            <td>Book Title:</td>
            <td>{{ book.title }}</td>
          </tr>
          <tr>
            <td>Book Author:</td>
            <td>{{ book.author }}</td>
          </tr>
          <!-- Add other book-related details here -->
        </table>
        <hr>
      </div>
      <div v-else>
        <p>Loading book rental profile... </p>

      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import LoadingModal from "@/components/Main/Modals/LoadingModal.vue";

export default {
  name: 'ViewRental',
  components: { LoadingModal },
  data() {
    return {
      loading: false,
      rental: null,
      user: null,
      book: null,
    };
  },
  mounted() {
    this.fetchRentalProfile();
  },
  methods: {
    fetchRentalProfile() {
      this.loading = true; // Set loading to true when you start loading data

      const rentalId = this.$route.params.id;
      console.log("RentalView received this param, rentalId: " + rentalId); // Debug statement

      axios
          .get(`http://localhost:8080/api/admin/rentals/read/${rentalId}`)
          .then((response) => {
            this.rental = response.data;
            console.log(this.rental.data);
            this.fetchUserProfile();
            this.fetchBookProfile();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false; // Set loading to false when all data has been fetched or in case of errors
          });
    },
    fetchUserProfile() {
      const userId = this.rental.user.id;

      axios
          .get(`http://localhost:8080/api/admin/users/read/${userId}`)
          .then((response) => {
            this.user = response.data;
            console.log(this.user.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetchBookProfile() {
      const bookId = this.rental.book.id;

      axios
          .get(`http://localhost:8080/api/admin/books/read/${bookId}`)
          .then((response) => {
            this.book = response.data;
            console.log(this.book.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  padding: 50px;
  justify-content: center;

}
.rental-profile {
  margin-top: 20px;
}

.rental-profile h1 {
  margin-bottom: 10px;
}

.profile-details {
  display: flex;
  flex-wrap: wrap;
}

.section {
  flex: 1 1 50%;
  margin-right: 20px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  flex-wrap: wrap;
}

.detail-row > div {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

span {
  margin-right: 10px;
}
.table-heading {
  font-weight: bold;
  margin-top: 50px;
  text-align: center;
}

table {
  width: 100%;
}

table th,
table td {
  padding: 5px;
  text-align: left;
}

table th {
  width: 30%;
}

/* Media query for narrow screens */
@media (max-width: 500px) {
  .profile-details {
    flex-direction: column; /* Stack sections vertically */
  }

  .section {
    margin-right: 0;
  }
}
</style>
