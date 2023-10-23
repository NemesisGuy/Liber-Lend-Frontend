<template>
  <div class="content-container">
<!--    cast first letter of genre  to capital letter-->

    <h1>List of Available {{ genre.charAt(0).toUpperCase() + genre.slice(1) }} Books</h1>
    <loading-modal v-if="loading" show />
    <div v-if="books.length === 0">
      <h4>No {{ genre.charAt(0).toUpperCase() + genre.slice(1) }} books are currently available.</h4>
    </div>
    <table v-if="books.length > 0">

      <thead>
      <tr>
        <th @click="sortBooks('id')">ID</th>
        <th @click="sortBooks('title')">Title</th>
        <th @click="sortBooks('author')">Author</th>
        <th @click="sortBooks('genre')">Genre</th>
        <th @click="sortBooks('ISBN')">ISBN</th>
        <th @click="sortBooks('edition')">Edition</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in sortedBooks" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.genre }}</td>
        <td>{{ book.ISBN }}</td>
        <td>{{ book.edition }}</td>
        <td>
          <button class="rent-button" @click="rentBook(book)"><i class="fas fa-handshake"></i> Rent</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingModal from '@/components/Main/Modals/LoadingModal.vue';

export default {
  name: 'BookList',
  components: {
    LoadingModal,
  },
  data() {
    return {
      books: [],
      genre: '',
      sortColumn: '',
      sortDirection: '',
      loading: false,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.loading = true;

      const genre = this.$route.params.genre;
      const available = this.$route.params.available === 'true'; // Convert the string to boolean
      let endpoint = `http://localhost:8080/api/books/list/${genre}`;

      if (available) {
        endpoint = `http://localhost:8080/api/books/list/available/${genre}`;
      }

      axios
          .get(`http://localhost:8080/api/books/list/available/${genre}`)
          .then((response) => {
            this.books = response.data;
            this.genre = genre;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
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
    rentBook(book) {
      // Perform the rental process here
      console.log('Renting book:', book);
      this.$router.push(`/rental/${book.id}`);
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
