<template>
  <div class="card-container card-container-admin">
    <div class="form-container-admin">
      <div>
        <h1>{{ book.title }}</h1>
        <p>{{ book.description }}</p>
        <p>Genre : {{ book.genre }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'BookDetail',
  components: {
    Carousel
  },
  data() {
    return {
      book: {
        id: 1,
        title: 'Sample Book Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        genre: 'Mystery',
        images: [
          'https://via.placeholder.com/800x400/FF5733/FFFFFF?text=Image+1',
          'https://via.placeholder.com/800x400/333333/FFFFFF?text=Image+2',
          'https://via.placeholder.com/800x400/7B2FBE/FFFFFF?text=Image+3',
          'https://via.placeholder.com/800x400/0099CC/FFFFFF?text=Image+4'
        ]
      }
    }
  }
};
</script>
