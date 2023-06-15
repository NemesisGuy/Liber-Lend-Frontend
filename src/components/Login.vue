<template>
  <div class="form-container">
    <form @submit.prevent="login">
      <h1 class="form-header">Login</h1>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" placeholder="Enter email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" placeholder="Enter password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <button @click="goToSignup">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      // Make an HTTP request to the backend login endpoint using Axios
      axios.post(`http://localhost:8080/api/auth/login`, userData)
          .then(response => {
            // Handle successful login
            console.log('Login successful:', response.data);
          })
          .catch(error => {
            // Handle login error
            console.error('Login error:', error.response.data);
          });
    },
    goToSignup() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the login component here */
</style>
