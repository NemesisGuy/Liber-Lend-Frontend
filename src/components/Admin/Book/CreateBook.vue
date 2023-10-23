<template>
  <div class="form-container" >
    <div class="add-book-form form">
      <form @submit.prevent="addBook">
        <h2 class="form-header">Add Book</h2>
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="book.title" required>
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input type="text" id="author" v-model="book.author" required>
        </div>
        <div class="form-group">
          <label for="genre">Genre:</label>
          <input type="text" id="genre" v-model="book.genre" required>
        </div>
        <div class="form-group">
          <label for="ISBN">ISBN:</label>
          <input type="text" id="ISBN" v-model="book.ISBN" required>
        </div>
        <div class="form-group">
          <label for="edition">Edition:</label>
          <input type="number" id="edition" v-model="book.edition" required>
        </div>
        <!-- You can add more attributes here if needed -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";


export default {
  data() {
    return {
      book: {
        title: 'title',
        author: 'author',
        genre: 'genre',
        ISBN: '0000000000000',
        edition: 1
      },errorMessage: '' // Added error message data property
    };
  },
  methods: {
    addBook() {
      this.errorMessage = ''; // Reset the error message

      axios.post('http://localhost:8080/api/admin/books/create', this.book)
          .then(response => {
            // Handle success
            console.log('Book added successfully');
            console.log(response.data);
            console.log(response);
          })
          .catch(error => {
            // Handle error
            console.log(error);
            if (error.response && error.response.status === 400) {
              // Display an error message to the user
              this.errorMessage = 'Invalid data. Please check the entered values.';
              console.log(error.response.data); // The response data contains details about the validation errors or data issues
              console.log(error.response.status);
              console.log(error.response);
            } else {
              // Display a generic error message
              this.errorMessage = 'An error occurred while adding the book.';
            }
          });

      // You can access the book object using 'this.book' in this method
      console.log('Adding book:', this.book);

      // Reset the form after adding the book
      this.resetForm();
      },
    resetForm() {
      // Reset the form fields
      this.book = {
        title: '',
        author: '',
        genre: '',
        ISBN: '',
        edition: 1
      };
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
