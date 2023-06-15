<template>
  <div class="book-details">
    <h1>Book Details</h1>
    <div class="details-container">
      <div>
        <label>Title:</label>
        <span>{{ book.title }}</span>
      </div>
      <div>
        <label>Author:</label>
        <span>{{ book.author }}</span>
      </div>
      <div>
        <label>Publisher:</label>
        <span>{{ book.publisher }}</span>
      </div>
      <div>
        <label>ISBN:</label>
        <span>{{ book.ISBN }}</span>
      </div>
      <div>
        <label>Image Link:</label>
        <span>{{ book.imageLink }}</span>
      </div>
      <div>
        <label>Description:</label>
        <span>{{ book.description }}</span>
      </div>
      <div>
        <label>Genre:</label>
        <span>{{ book.genre }}</span>
      </div>
      <div>
        <label>Language:</label>
        <span>{{ book.language }}</span>
      </div>
      <div>
        <label>Edition:</label>
        <span>{{ book.edition }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookDetails',
  data() {
    return {
      book: null,
    };
  },
  mounted() {
    this.fetchBookDetails();
  },
  methods: {
    fetchBookDetails() {
      // Assuming you have the book ID or any other identifier to fetch the book details
      const bookId = '123'; // Replace with the actual book ID

      axios
          .get(`http://localhost:8080/api/book/${bookId}`)
          .then((response) => {
            this.book = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the component */
</style>
