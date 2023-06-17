<template>
  <div>

    <form @submit.prevent="updateBook">
      <h1>Edit Book</h1>
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="book.title" required>

      <label for="author">Author:</label>
      <input type="text" id="author" v-model="book.author" required>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      book: {
        id: '',
        title: '',
        author: ''
      }
    };
  },
  methods: {
    fetchBook() {
      const bookId = this.$route.params.id;
      axios
          .get(`http://localhost:8080/api/books/read/${bookId}`)
          .then((response) => {
            this.book = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    updateBook() {
      const bookId = this.$route.params.id;
      axios
          .put(`http://localhost:8080/api/books/update/${bookId}`, this.book)
          .then((response) => {
            console.log("Book updated:", response.data);
            // Redirect to the book details page or update the book list
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  created() {
    this.fetchBook(); // Fetch book details when the component is created
  }
};
</script>
