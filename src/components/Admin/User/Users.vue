<template>
  <div>
    <h1>Users Component</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.userName }}
        <button @click="deleteUser(user.id)">Delete</button>
        <button @click="updateUser(user)">Update</button>
        <button @click="openUserView(user.id)">View</button>
      </li>
    </ul>

    <router-link to="/admin/users/create">
      <button>Add New User</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [] // Placeholder for the list of users
    };
  },
  methods: {
    fetchUsers() {
      axios
          .get(`http://localhost:8080/api/admin/users/all`)
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addUser(user) {
      // Add a new user to the 'users' array
    },
    updateUser(user) {
      // Update an existing user in the 'users' array
    },
    deleteUser(userId) {
      // Delete a user from the 'users' array
    },

      openUserView(userId) {
        this.$router.push(`/admin/users/read/${userId}`);
      },
  },
  created() {
    this.fetchUsers(); // Fetch users when the component is created
  }
};
</script>
