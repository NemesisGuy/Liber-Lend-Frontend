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
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in sortedBooks" :key="book.id">
          <td>{{ book.id }}</td>
          <td>
            <input v-model="book.title" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.author" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.publisher" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.ISBN" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.genre" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.language" :disabled="!book.editMode" />
          </td>
          <td>
            <input v-model="book.edition" :disabled="!book.editMode" type="number" />
          </td>
          <td>
            <button @click="toggleEditMode(book)" class="btn-small">
              {{ book.editMode ? 'Save' : 'Edit' }}
            </button>
          </td>
          <td>
            <button @click="deleteBookPrompt(book.id)" class="btn-small">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookUpdate',
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
      const category = 'all';
      axios
          .get(`http://localhost:8080/api/books/${category}`)
          .then((response) => {
            this.books = response.data.map((book) => ({
              ...book,
              editMode: false,
            }));
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
    toggleEditMode(book) {
      if (book.editMode) {
        this.updateBook(book);
      }
      book.editMode = !book.editMode;
    },
    updateBook(book) {
      axios
          .put(`http://localhost:8080/api/books/update/${book.id}`, book)
          .then((response) => {
            console.log(response);
            console.log('Book updated');
          })
          .catch((error) => {
            console.log(error);
            console.log('Book not updated');
          });
    },
    deleteBookPrompt(bookId) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        this.deleteBook(bookId);
      }
    },
  },
  computed: {
    sortedBooks() {
      let sortedBooks = [...this.books];

      if (this.sortColumn) {
        sortedBooks.sort((a, b) => {
          let valueA = a[this.sortColumn];
          let valueB = b[this.sortColumn];

          if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }

          if (valueA < valueB) {
            return this.sortDirection === 'asc' ? -1 : 1;
          }
          if (valueA > valueB) {
            return this.sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return sortedBooks;
    },
  },
};
</script>


<style scoped>
/* Add custom styles for the component */
</style>
