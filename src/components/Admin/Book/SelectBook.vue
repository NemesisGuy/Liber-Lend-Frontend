<template>
  <div class="book-selection-container">
    <div class="card book-list-card">
      <h2>Book List</h2>
      <input type="text" v-model="searchQuery" placeholder="Search Book" />
      <ul>
        <li v-for="book in filteredBooks" :key="book.id" @click="selectBook(book.id)" :class="{ active: selectedBookId === book.id }">
          {{ book.title }}
        </li>
      </ul>
    </div>

    <div class="card book-details-card">
      <h2>Book Details</h2>
      <div v-if="selectedBook">
        <div>
          <label>Title:</label>
          <span>{{ selectedBook.title }}</span>
        </div>
        <div>
          <label>Author:</label>
          <span>{{ selectedBook.author }}</span>
        </div>
        <div>
          <label>Publisher:</label>
          <span>{{ selectedBook.publisher }}</span>
        </div>
        <div>
          <label>ISBN:</label>
          <span>{{ selectedBook.ISBN }}</span>
        </div>
        <div>
          <label>Image Link:</label>
          <span>{{ selectedBook.imageLink }}</span>
        </div>
        <div>
          <label>Description:</label>
          <span>{{ selectedBook.description }}</span>
        </div>
        <div>
          <label>Genre:</label>
          <span>{{ selectedBook.genre }}</span>
        </div>
        <div>
          <label>Language:</label>
          <span>{{ selectedBook.language }}</span>
        </div>
        <div>
          <label>Edition:</label>
          <span>{{ selectedBook.edition }}</span>
        </div>
      </div>
      <div v-else>
        <p>No book selected.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookSelection',
  data() {
    return {
      books: [],
      selectedBookId: '',
      selectedBook: null,
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios
          .get('http://localhost:8080/api/books/all')
          .then((response) => {
            this.books = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
      this.selectedBook = this.books.find((book) => book.id === this.selectedBookId);
    },
  },
  computed: {
    filteredBooks() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return this.books.filter((book) => book.title.toLowerCase().includes(query));
      }
      return this.books;
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the component */
</style>
