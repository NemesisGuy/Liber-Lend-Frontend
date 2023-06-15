<template>
  <div class="content-container">
    <div class="card-container">
      <h1>List of Books</h1>
      <table>
        <thead>
        <tr>
          <th @click="sortBooks('id')">ID</th>
          <th @click="sortBooks('title')">Title</th>
          <th @click="sortBooks('author')">Author</th>
          <th @click="sortBooks('publisher')">Publisher</th>
          <th @click="sortBooks('ISBN')">ISBN</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in sortedBooks" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.ISBN }}</td>
          <td><button @click="deleteBook(book.id)">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteBook',
  data() {
    return {
      books: [],
      sortColumn: '', // Current column to sort by
      sortDirection: '', // Current sort direction
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
    sortBooks(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
    deleteBook(bookId) {
      axios
          .delete(`http://localhost:8080/api/books/delete/${bookId}`)
          .then((response) => {
            this.fetchBooks();
            console.log(response);
            console.log('Book deleted');
          })
          .catch((error) => {
            console.log(error);
            console.log('Book not deleted');
          });
    },
  },
  computed: {
    sortedBooks() {
      if (this.sortColumn && this.sortDirection) {
        return this.books.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
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
/* Add custom styles for the component */
</style>
