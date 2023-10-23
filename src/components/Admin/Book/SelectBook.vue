<template>
  <div class="book-selection-container">
    <div class="card book-list-card">
      <h2>Book List</h2>
      <input type="text" v-model="searchQuery" placeholder="Search Book" />
      <ul>
        <li v-for="book in filteredBooks" :key="book.id" @click="selectBook(book.id)" :class="{ active: selectedBookId === book.id }">
          {{ book.title }} ({{ book.author }})
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
          <label>Genre:</label>
          <span>{{ selectedBook.genre }}</span>
        </div>
        <div>
          <label>ISBN:</label>
          <span>{{ selectedBook.ISBN }}</span>
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
          .get('http://localhost:8080/api/admin/books/all')
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
        return this.books.filter((book) => {
          const makeModel = `${book.make} ${book.model}`.toLowerCase();
          return makeModel.includes(query);
        });
      }
      return this.books;
    },
  },
};
</script>

<style scoped>
.book-selection-container {
  display: flex;
  justify-content: space-between;
}

.card {
  padding: 20px;
  border-radius: 2px;
  background-color: #6610f2;
  width: 45%;
  box-shadow: black 0px 0px 5px 0px;
}

.book-list-card {
  margin: 20px;
}

.book-list-bookd h2 {
  margin-bottom: 10px;
}

.book-list-card input[type="text"] {
  margin-bottom: 10px;
}

.book-list-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.book-list-card li {
  cursor: pointer;
  padding: 5px;
  margin-bottom: 5px;
}

.book-list-card li:hover,
.book-list-card li.active {
  background-color: #6610f2;
}

.book-details-card {
  margin: 20px;
  background-color: #6610f2;
}

.book-details-card h2 {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

span {
  margin-left: 10px;
}
</style>
