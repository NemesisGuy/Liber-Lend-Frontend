<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmpassword" placeholder="Confirm Password" required />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import backendBaseUrl from '@/config';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',

    };
  },
  methods: {
    signup() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      // Make an HTTP request to the backend signup endpoint using Axios
      axios
          .post(`${backendBaseUrl}/api/v1/auth/signup`, userData)
          .then(response => {
            // Handle successful signup
            console.log('Signup successful:', response.data);
          })
          .catch(error => {
            // Handle signup error
            if (error.response) {
              // The request was made and the server responded with a status code
              if (error.response.status === 400) {
                // Handle validation errors
                console.error('Signup validation error:', error.response.data);
              } else if (error.response.status === 403) {
                // Handle authorization errors
                console.error('Signup authorization error:', error.response.data);

              } else {
                // Handle other server errors
                console.error('Signup server error:', error.response.data);
              }
            } else {
              // The request was made but no response was received
              console.error('Signup error:', error.message);
            }
          });
    },
  },
  created() {
    // Set the CSRF token in the request headers
    axios.interceptors.request.use(config => {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      config.headers['X-XSRF-TOKEN'] = csrfToken;
      return config;
    });
  },
};
</script>

<style scoped>
/* Add your custom styles for the signup component here */
</style>
