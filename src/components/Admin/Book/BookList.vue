<template>
  <div class="content-container">
    <div class="card-container">
      <h1>List of {{ category }} Books</h1>
      <table>
        <thead>
        <tr>
          <th @click="sortBooks('id')">ID</th>
          <th @click="sortBooks('title')">Title</th>
          <th @click="sortBooks('author')">Author</th>
          <th @click="sortBooks('publisher')">Publisher</th>
          <th @click="sortBooks('ISBN')">ISBN</th>
          <th @click="sortBooks('genre')">Genre</th>
          <th @click="sortBooks('language')">Language</th>
          <th @click="sortBooks('edition')">Edition</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in sortedBooks" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.ISBN }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.language }}</td>
          <td>{{ book.edition }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookList',
  data() {
    return {
      books: [],
      category: '',
      sortColumn: '',
      sortDirection: '',
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      const category = this.$route.params.category;
      axios
          .get(`http://localhost:8080/api/books/${category}`)
          .then((response) => {
            this.books = response.data;
            this.category = category;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    sortBooks(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
  },
  computed: {
    sortedBooks() {
      if (this.sortColumn && this.sortDirection) {
        return this.books.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return this.sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
          } else {
            return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
          }
        });
      }
      return this.books;
    },
  },
};
</script>

<style scoped>
/* Styles for the BookList component */
</style>

<style>
.book {
  border: 1px solid #5e5a5a;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #bd1b1b;
  color: #181818;
}
</style>
