<template>
  <div class="add-book-form form">
    <form @submit.prevent="addBook">
      <h2 class="form-header">Add Book</h2>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="book.title" required placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="author">Author:</label>
        <input type="text" id="author" v-model="book.author" required placeholder="Enter author">
      </div>
      <div class="form-group">
        <label for="publisher">Publisher:</label>
        <input type="text" id="publisher" v-model="book.publisher" required placeholder="Enter publisher">
      </div>
      <div class="form-group">
        <label for="ISBN">ISBN:</label>
        <input type="text" id="ISBN" v-model="book.ISBN" required placeholder="Enter ISBN">
      </div>
      <div class="form-group">
        <label for="imageLink">Image Link:</label>
        <input type="text" id="imageLink" v-model="book.imageLink" required placeholder="Enter image link">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="book.description" required placeholder="Enter description"></textarea>
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input type="text" id="genre" v-model="book.genre" required placeholder="Enter genre">
      </div>
      <div class="form-group">
        <label for="language">Language:</label>
        <input type="text" id="language" v-model="book.language" required placeholder="Enter language">
      </div>
      <div class="form-group">
        <label for="edition">Edition:</label>
        <input type="number" id="edition" v-model="book.edition" required placeholder="Enter edition">
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        publisher: "",
        ISBN: "",
        imageLink: "",
        description: "",
        genre: "",
        language: "",
        edition: 1,
      },
    };
  },
  methods: {
    addBook() {
      // Send the book data to the backend API or perform any other necessary actions
      axios
          .post("http://localhost:8080/api/books/create", this.book)
          .then((response) => {
            // Handle success
            console.log(response);
          })
          .catch((error) => {
            // Handle error
            console.log(error);
          });

      // You can access the book object using 'this.book' in this method
      console.log("Adding book:", this.book);

      // Reset the form after adding the book
      this.resetForm();
    },
    resetForm() {
      // Reset the form fields
      this.book = {
        title: "",
        author: "",
        publisher: "",
        ISBN: "",
        imageLink: "",
        description: "",
        genre: "",
        language: "",
        edition: 1,
      };
    },
  },
};
</script>

<style scoped>

</style>
