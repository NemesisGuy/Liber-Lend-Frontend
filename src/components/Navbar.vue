<template>

  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/admin/users/all">List User</router-link></li>
      <li><router-link to="/api/books/all">Book List </router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/signup">Sign Up</router-link></li>
      <li><router-link to="/admin">Admin Dashboard</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    openRegisterForm() {
      this.$router.push('/signup');
    },
    openLoginForm() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
/* Add your custom styles for the navbar here */
</style>
