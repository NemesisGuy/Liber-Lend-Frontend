<template>
  <div class="card-container card-container-admin">
    <div class="form-container-admin">
      <h1>Book Profile</h1>
      <div class="profile-details" v-if="book">
        <div>
          <label>Title:</label>
          <span>{{ book.title }}</span>
        </div>
        <div>
          <label>Author:</label>
          <span>{{ book.author }}</span>
        </div>
        <div>
          <label>Genre:</label>
          <span>{{ book.genre }}</span>
        </div>
        <div>
          <label>ISBN:</label>
          <span>{{ book.ISBN }}</span>
        </div>
        <div>
          <label>Edition:</label>
          <span>{{ book.edition }}</span>
        </div>
        <!-- You can add more attributes here if needed -->
      </div>
      <div v-else>
        <p>Loading book profile...</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'ViewBook',
  data() {
    return {
      book: null,
    };
  },
  mounted() {
    this.fetchBookProfile();
  },
  methods: {
    fetchBookProfile() {
      // Assuming you have the book ID or any other identifier to fetch the book's profile
      const bookId = this.$route.params.id// Get the category from the route parameter

      axios
          .get(`http://localhost:8080/api/admin/books/read/${bookId}`)
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
.card-container {

padding: 50px;
  justify-content: center;
}
.book-profile {
  margin-top: 20px;
}

.book-profile h1 {
  margin-bottom: 10px;
}

.profile-details div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

span {
  margin-left: 10px;
}
</style>


