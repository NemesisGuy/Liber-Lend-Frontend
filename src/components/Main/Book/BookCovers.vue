<template>
  <div>
    <img :src="bookThumbnail" alt="Book Cover" class="thumbnail" />

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookThumbnail: "", // Initialize it as an empty string
    };
  },

  mounted() {
    const isbn = "0553283685"; // Replace with the actual ISBN of the book
    this.fetchBookThumbnail(isbn);
  },
  methods: {
    fetchBookThumbnail(isbn) {
      axios
          .get(`http://localhost:8080/api/books/details/cover/${isbn}`, { responseType: 'arraybuffer' })
          .then((response) => {
            // Convert the binary image data to a data URL
            const contentType = response.headers['content-type'];
            console.log('contentType:', contentType);
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            console.log('base64Image:', base64Image);
            this.bookThumbnail = `data:${contentType};base64,${base64Image}`;
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    },

  },
};
</script>

<style scoped>
/* Add any CSS styles for your component here */
</style>
