<template>
  <loading-modal v-if="loading" show/>
  <div class="content-container">
    <div class="content-header">
      <h1><i class="fas fa-book"> </i>
        Book Management
      </h1>
      <div class="search-bar-container">

        <div class="search-input">
          <input v-model="searchQuery" placeholder="Search..." type="text" />
          <button @click="resetSearch" class="reset-search-button">
            <i class="fas fa-search"> </i> Reset
          </button>
        </div>
        <router-link to="/admin/books/create" class="add-button book-button">
          <i class="fas fa-book"> </i> Add New Book
        </router-link>

      </div>

    </div>
    <table>
      <thead>
      <tr>
        <th @click="sortBooks('id')">ID  <i class="fas fa-sort"></i></th>
        <th @click="sortBooks('title')">Title  <i class="fas fa-sort"></i></th>
        <th @click="sortBooks('author')">Author  <i class="fas fa-sort"></i></th>
        <th @click="sortBooks('genre')">Genre  <i class="fas fa-sort"></i></th>
        <th class="description-column" @click="sortBooks('description')">Description  <i class="fas fa-sort"></i></th>

        <th @click="sortBooks('isbn')">ISBN  <i class="fas fa-sort"></i></th>
        <th @click="sortBooks('edition')">Edition  <i class="fas fa-sort"></i></th>
        <th class="actions-column">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in filteredBooks" :key="book.id">
        <td v-if="!book.editing">{{ book.id }}</td>
        <td v-else>
          <input type="text" v-model="book.id" disabled>
        </td>
        <td v-if="!book.editing">{{ book.title }}</td>
        <td v-else>
          <input type="text" v-model="book.title">
        </td>
        <td v-if="!book.editing">{{ book.author }}</td>
        <td v-else>
          <input type="text" v-model="book.author">
        </td>
        <td v-if="!book.editing">{{ book.genre }}</td>
        <td v-else>
          <input type="text" v-model="book.genre">
        </td>
        <td v-if="!book.editing">{{ book.description }}</td>
        <td v-else>
          <input type="text" v-model="book.description">
        </td>
        <td v-if="!book.editing">{{ book.isbn}}</td>
        <td v-else>
          <input type="text" v-model="book.isbn">
        </td>
        <td v-if="!book.editing">{{ book.edition }}</td>
        <td v-else>
          <input type="text" v-model="book.edition">
        </td>
        <td>
          <template v-if="!book.editing">
            <button @click="deleteBook(book.id)" class="delete-button">
              <i class="fas fa-trash"></i> Delete
            </button>
            <button @click="editBook(book)" class="update-button"><i class="fas fa-edit"></i> Edit</button>
            <button @click="openBookView(book.id)" class="read-button"><i class="fas fa-eye"></i> Read</button>
          </template>
          <template v-else>
            <button @click="saveBook(book)" class="update-button">Save</button>
            <button @click="cancelEdit(book)" class="delete-button">Cancel</button>
          </template>
        </td>
      </tr>
      </tbody>
    </table>


    <confirmation-modal
        :show="showConfirmationModal"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
    >
      <template v-if="bookToDelete">
        <div>
          <p>Are you sure you want to delete this Book?</p>
          <hr>
          <p>ID: {{ bookToDelete.id }}</p>
          <p>Title: {{ bookToDelete.title }}</p>
          <p>Author: {{ bookToDelete.author }}</p>
          <p>Genre: {{ bookToDelete.genre }}</p>
          <p>Description: {{ bookToDelete.description }}</p>
          <p>ISBN: {{ bookToDelete.isbn }}</p>
          <p>Edition: {{ bookToDelete.edition }}</p>
          <hr>
          <p><b>Warning!!!</b> This action cannot be undone.</p>
        </div>
      </template>
    </confirmation-modal>
    <SuccessModal v-if="successModal.show" @close="closeModal" @cancel="closeModal" :show="successModal.show" :message="successModal.message"></SuccessModal>
    <FailureModal v-if="failModal.show"    @close="closeModal" @cancel="closeModal" :show="failModal.show"    :message="failModal.message">   </FailureModal>


  </div>
</template>


<script>
import axios from "axios";
import ConfirmationModal from "../../Main/Modals/ConfirmationModal.vue";
import LoadingModal from "../../Main/Modals/LoadingModal.vue";
import SuccessModal from "@/components/Main/Modals/SuccessModal.vue";
import FailureModal from "@/components/Main/Modals/FailureModal.vue";

export default {
  data() {
    return {
      books: [], // Placeholder for the list of books
      loading: false,
      sortBy: "",
      searchQuery: "",
      showConfirmationModal: false, // Flag to show/hide the confirmation modal
      bookToDelete: null, // Placeholder for the book ID that is being deleted
      successModal: {
        show: false,
        message: ""
      }, // Placeholder for the success modal
      failModal: {
        show: false,
        message: ""
      }, // Placeholder for the failure modal
    };
  },
  components: {
    ConfirmationModal,
    LoadingModal,
    SuccessModal,
    FailureModal,
  },
  computed: {
    sortedBooks() {
      if (this.sortBy) {
        const sorted = [...this.books];
        sorted.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
        return sorted;
      }
      return this.books;
    },
    filteredBooks() {
      const query = this.searchQuery.toLowerCase();
      return this.sortedBooks.filter((book) => {
        for (const key in book) {
          if (
              typeof book[key] === "string" &&
              book[key].toLowerCase().includes(query)
          ) {
            return true;
          }
        }
        return false;
      });
    },
  },
  methods: {
    fetchBooks() {
      this.loading = true;
      axios
          .get("http://localhost:8080/api/admin/books/list/all")
          .then((response) => {
            this.books = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.failModal.message = "Failed to fetch books. Please try again.";
            this.failModal.show = true;
          })
          .finally(() => {
            this.loading = false;
          });
    },
    closeModal() {
      this.successModal.show = false;
      this.failModal.show = false;
      this.showConfirmationModal = false;
    },
    deleteBook(bookId) {
      this.showConfirmationModal = true;
      this.bookToDelete = this.books.find((book) => book.id === bookId);
    },
    cancelDelete() {
      this.showConfirmationModal = false;
      this.bookToDelete = null;
    },
    confirmDelete() {
      if (this.bookToDelete) {
        this.loading = true;
        axios
            .delete(`http://localhost:8080/api/admin/books/delete/${this.bookToDelete.id}`)
            .then((response) => {
              this.fetchBooks();
              console.log(response);
              console.log("Book deleted");
              this.successModal.show = true; // Show success modal
              this.successModal.message = "Book ID: "+this.bookToDelete.id+ " was deleted successfully! Please refresh the page to see the changes."
            })
            .catch((error) => {
              console.log(error);
              console.log("Book not deleted");
              this.failModal.show = true; // Show failure modal
              this.failModal.message = error.response.data.message;
            })
            .finally(() => {
              this.loading = false;
              this.showConfirmationModal = false;
              this.bookToDelete = null;

            });
      }
    },
    openBookView(bookId) {
      this.$router.push(`/admin/books/read/${bookId}`);
    },
    sortBooks(sortBy) {
      this.sortBy = sortBy;
    },
    resetSearch() {
      this.searchQuery = "";
    },
    editBook(book) {
      book.editing = true;
    },
    saveBook(book) {
      this.pushUpdatedBook(book);
      console.log('Saving book with ISBN:', book.isbn);
      book.editing = false;
      this.loading = true;
    },
    pushUpdatedBook(book) {
      console.log('Updating book with payload:', book);
      axios
          .put(`http://localhost:8080/api/admin/books/update/${book.id}`, book)
          .then((response) => {
            console.log(response);
            console.log("Book updated");
            this.loading = false;
            // this.successModal = true; // Show success modal
            this.successModal.show = true; // Show success modal
            this.successModal.message = "Book ID: " + book.id + " was updated successfully"; // Show success modal


          })
          .catch((error) => {
            console.log(error);
            console.log("Book not updated");
            this.loading = false;
            this.failModal.show = true; // Show fail modal
            this.failModal.message = "Book ID: " + book.id + " was not updated successfully"; // Show success modal

          })
          .finally(() => {
            this.loading = false;


          });
    },
    cancelEdit(book) {
      book.editing = false;
    },
    closeSuccessFailModal() {

      this.successModal.show = false;
      this.failModal.show = false;
    },
  },
  created() {
    this.fetchBooks();
  },

};
</script>


<style scoped>

</style>