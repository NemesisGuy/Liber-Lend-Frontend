<template>
  <div>
    <h1>Books Component</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
        <button @click="deleteBook(book.id)">Delete</button>
        <button @click="updateBook(book)">Update</button>
        <button @click="openBookView(book.id)">Read</button>
      </li>
    </ul>

    <router-link to="/admin/books/create">
      <button>Add New Book</button>
    </router-link>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [] // Placeholder for the list of books
    };
  },
  methods: {
    fetchBooks() {
      const category = this.$route.params.category;
      axios
          .get(`http://localhost:8080/api/books/all`)
          .then((response) => {
            this.books = response.data;
            this.category = category;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addBook(book) {
      // Add a new book to the 'books' array
    },
    updateBook(book) {
      // Update an existing book in the 'books' array
    },
    deleteBook(bookId) {
      // Delete a book from the 'books' array
    },
    openBookView(bookId) {
      this.$router.push(`/admin/books/read/${bookId}`);
    }
  },
  created() {
    this.fetchBooks(); // Fetch books when the component is created
  }
};
</script>
