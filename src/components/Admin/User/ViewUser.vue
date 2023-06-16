<template>
  <div v-if="user">
    <h1>User Profile</h1>
    <div class="profile-details">
      <div>
        <label>Username:</label>
        <span>{{ user.userName }}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>
      <div>
        <label>First Name:</label>
        <span>{{ user.firstName }}</span>
      </div>
      <div>
        <label>Last Name:</label>
        <span>{{ user.lastName }}</span>
      </div>
      <div>
        <label>Phone Number:</label>
        <span>{{ user.phoneNumber }}</span>
      </div>
      <div>
        <label>Role:</label>
        <span>{{ user.role }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    User not found.
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'ViewUser',
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      const userId = this.$route.params.userId; // Check if the route parameter is correct

      axios
          .get(`http://localhost:8080/api/admin/users/read/${userId}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
/* Add your component's styles here */
</style>
