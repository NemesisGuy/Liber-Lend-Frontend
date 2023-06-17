<template>
  <div class="card-container">
    <h1>Books Component</h1>
    <router-link to="/admin/books/create" class="add-book-link">
      Add New Book
    </router-link>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>
          <button @click="deleteBook(book.id)" class="delete-button">Delete</button>
          <button @click="updateBook(book.id)" class="update-button">Update</button>
          <button @click="openBookView(book.id)" class="read-button">Read</button>
        </td>
      </tr>
      </tbody>
    </table>
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
      axios
          .get(`http://localhost:8080/api/books/all`)
          .then((response) => {
            this.books = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    deleteBook(bookId) {
      // Delete a book from the 'books' array
    },
    updateBook(bookId) {
      // Update an existing book in the 'books' array
      console.log("Update book with ID:", bookId);
      this.$router.push(`/admin/books/edit/${bookId}`);
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

<style scoped>
.add-book-link {
  margin-bottom: 1rem;
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
}

.delete-button {
  background-color: #e53935;
}

.update-button {
  background-color: #ff9800;
}

.read-button {
  background-color: #2196f3;
}
</style>
