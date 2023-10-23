<template>
  <div class="add-user-form form">
    <LoadingModal :show="loadingModal.show" v-if="loadingModal.show"></LoadingModal>

    <form @submit.prevent="addUser">
      <h2 class="form-header">Add User</h2>
      <div class="form-group">
        <label for="userName">Username:</label>
        <input type="text" id="userName" v-model="user.userName" required placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" required placeholder="Enter first name">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" required placeholder="Enter last name">
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" v-model="user.phoneNumber" required placeholder="Enter phone number">
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="user.role" required>
          <option value="Guest">Guest</option>
          <option value="User" selected>User</option>
          <option value="Privileged">Privileged</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
  <SuccessModal
      key="successModal"
      v-if="successModal.show"
      @close="closeModal"
      @cancel="closeModal"
      @confirm="closeModal"
      @ok="closeModal"
      :show="successModal.show"
      :message="successModal.message"
  ></SuccessModal>
  <FailureModal
      key="failModal"
      v-if="failureModal.show"
      @close="closeModal"
      @cancel="closeModal"
      :show="failureModal.show"
      :message="failureModal.message"
  ></FailureModal>
</template>

<script>
import axios from "axios";
import successModal from "@/components/Main/Modals/SuccessModal.vue";
import failureModal from "@/components/Main/Modals/FailureModal.vue";
import loadingModal from "@/components/Main/Modals/LoadingModal.vue";
import SuccessModal from "@/components/Main/Modals/SuccessModal.vue";
import FailureModal from "@/components/Main/Modals/FailureModal.vue";
import LoadingModal from "@/components/Main/Modals/LoadingModal.vue";

export default {
  computed: {
    loadingModal() {
      return loadingModal
    },
    failureModal() {
      return failureModal
    },
    successModal() {
      return successModal
    }
  },
  data() {
    return {
      user: {
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "User",
      },
      loadingModal: {
        show: false,
      },
      successModal: {
        show: false,
        message: "",
      },
      failureModal: {
        show: false,
        message: "",
      },
    };
  },
  components: {
    SuccessModal,
    FailureModal,
    LoadingModal,
  },
  methods: {
    addUser() {
      this.loadingModal.show = true;
      // Send the user data to the backend API or perform any other necessary actions
      axios
          .post("http://localhost:8080/api/admin/users/create", this.user)
          .then((response) => {
            this.loadingModal.show = false;
            this.successModal.message = "User added successfully.";
            console.log(response);
            this.successModal.show = true;
            this.resetForm();
          })
          .catch((error) => {
            this.loadingModal.show = false;
            this.failureModal.message = "An error occurred while adding the user.";
            this.failureModal.show = true;
            console.log(error);
          });
    },
    closeModal() {
      this.successModal.show = false;
      this.failureModal.show = false;
    },
    resetForm() {
      // Reset the form fields
      this.user = {
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "User",
      };
    },
  },
};
</script>

<style scoped>

</style>
