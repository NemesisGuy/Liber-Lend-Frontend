<template>
  <div class="form-container" @submit.prevent="register">
    <form>
      <h2 class="form-header"> <i class="fas fa-user-plus"></i> Signup</h2>
      <div class="form-group">
        <label for="username"><i class="fas fa-user"></i> Username:</label>
        <input type="text" id="userName" name="userName" placeholder="Enter your username" v-model="userName" required>
      </div>

      <div class="form-group">
        <label for="email"><i class="fas fa-envelope"></i> Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password"><i class="fas fa-lock"></i> Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password"><i class="fas fa-lock"></i> Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required>
      </div>
      <div class="form-button-container">
        <button type="submit" class="confirm-button"><i class="fas fa-user-plus"></i> Signup</button>
        <button @click="goToLogin" class="update-button"><i class="fas fa-sign-in-alt"></i> Login</button>
      </div>
    </form>
  </div>
  <!-- Your other content -->
</template>

<script>
import LoadingModal from "@/components/Main/Modals/LoadingModal.vue";
import SuccessModal from "@/components/Main/Modals/SuccessModal.vue";
import FailureModal from "@/components/Main/Modals/FailureModal.vue";
import axios from "axios";

export default {
  components: {
    LoadingModal,
    SuccessModal,
    FailureModal,

  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      showLoadingModal: false,
      showSuccessModal: false,
      showFailureModal: false,
      successMessage: "",
      failureMessage: ""
    };
  },
  methods: {
    register() {
      this.showLoadingModal = true;
      axios
          .post("http://localhost:8080/api/users/register", {

            userName: this.userName,
            email: this.email,
            password: this.password
          })
          .then(response => {
            // Handle success
            console.log(response);
            this.showLoadingModal = false;
            this.showSuccessModal = true;
            this.successMessage = "Registration successful";

          })
          .catch(error => {
            // Handle error
            console.log(error);
            this.showLoadingModal = false;
            this.showFailureModal = true;
            this.failureMessage = "Registration failed";
          });
    },
    goToLogin() {
      // this.$router.push("/login");
      this.$router.push({ name: 'Login' });

    },
    performAction() {
      // Show loading modal while waiting for the server response
      this.showLoadingModal = true;

      // Simulate a server request with a delay
      setTimeout(() => {
        // Simulate a successful action
        this.showLoadingModal = false;
        this.showSuccessModal = true;
        this.successMessage = "Action successful";
      }, 2000);
    },
    confirmSuccessModal() {
      this.showSuccessModal = false;
      // Perform any additional actions or navigate to another page
      // For example, you can redirect to the login page after a successful registration
      this.$router.push('/nav/user/login');
    },

    performFailureAction() {
// Show loading modal while waiting for the server response
      this.showLoadingModal = true;
      // Simulate a server request with a delay
      setTimeout(() => {
        // Simulate a failed action
        this.showLoadingModal = false;
        this.showFailureModal = true;
        this.failureMessage = 'Action failed';
      }, 2000);
    },
    confirmFailureModal() {
      this.showFailureModal = false;
      // Perform any additional actions or handle the failure case
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>



