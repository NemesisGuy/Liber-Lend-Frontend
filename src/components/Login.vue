<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';


import backendBaseUrl from '@/config';

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
      axios.post('${backendBaseUrl}/api/v1/auth/login', userData)
          .then(response => {
            // Handle successful login
            console.log('Login successful:', response.data);
          })
          .catch(error => {
            // Handle login error
            console.error('Login error:', error.response.data);
          });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the login component here */
</style>
