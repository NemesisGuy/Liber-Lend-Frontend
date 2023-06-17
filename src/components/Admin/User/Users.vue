<template>
  <div>
    <h1>Users Component</h1>
    <router-link to="/admin/users/create" class="add-user-link">
      Add New User
    </router-link>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button @click="deleteUser(user.id)" class="delete-button">Delete</button>
          <button @click="updateUser(user)" class="update-button">Update</button>
          <button @click="openUserView(user.id)" class="read-button">Read</button>

        </td>
      </tr>
      </tbody>
    </table>
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
    deleteUser(userId) {
      // Delete a user from the 'users' array
    },
    updateUser(user) {
      // Update an existing user in the 'users' array
    },
    openUserView(userId) {
      this.$router.push(`/admin/users/read/${userId}`);
    }
  },
  created() {
    this.fetchUsers(); // Fetch users when the component is created
  }
};
</script>

<style scoped>
.add-user-link {
  margin-bottom: 1rem;
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  font-weight: bold;
  border-bottom: 1px solid #ddd;

}

th {
  padding: 0.5rem;
  text-align: left;
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

button {
  margin-right: 0.5rem;
}
button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
}

.delete-button {
  background-color: #e53935;
}

.update-button {
  background-color: #ff9800;
}

.read-button {
  background-color: #2196f3;
}
</style>
