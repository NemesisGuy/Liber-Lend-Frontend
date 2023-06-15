<template>
  <div id="app">
    <div class="app-container">
      <div class="nav-container">
        <navbar></navbar>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {Navbar},
};
</script>

<style>
/* Add your global styles here */
</style>
