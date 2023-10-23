<template>
  <div class="card-container card-container-admin">
    <div class="form-container-admin">
      <form>
        <h1>Reservation Profile</h1>
        <div class="profile-details" v-if="reservation">
          <div>
            <label>Reservation ID:</label>
            <span>{{ reservation.reservationId }}</span>
          </div>
          <div>
            <label>Date Reserved:</label>
            <span>{{ reservation.dateReserved }}</span>
          </div>
          <div>
            <label>Date Returned:</label>
            <span>{{ reservation.dateReturned }}</span>
          </div>
          <!-- You can add more reservation attributes here if needed -->
        </div>
        <div v-else>
          <p>Loading reservation profile...</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewReservation',
  data() {
    return {
      reservation: null,
    };
  },
  mounted() {
    this.fetchReservationProfile();
  },
  methods: {
    fetchReservationProfile() {
      // Assuming you have the reservation ID or any other identifier to fetch the reservation's profile
      const reservationId = this.$route.params.id; // Get the reservation ID from the route parameter

      axios
          .get(`http://localhost:8080/api/admin/reservations/read/${reservationId}`)
          .then((response) => {
            this.reservation = response.data;
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
  padding: 50px;
  justify-content: center;
}
form {
  margin-top: 20px;
}

h1 {
  margin-bottom: 10px;
}

.profile-details div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

span {
  margin-left: 10px;
}
</style>
