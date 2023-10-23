<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-4"><i class="fas fa-book"></i> Welcome to Liber Lend Library!</h1>
      <p class="lead">Explore our collection of books and enjoy the world of reading.</p>
      <hr class="my-4">
      <p>Browse our wide range of books and borrow your favorites today.</p>
      <!-- Link to view all books -->
<!--      <router-link :to="{ name: 'BookList' }" class="custom-button">
        <i class="fas fa-search"></i> Explore Books
      </router-link>-->
    </div>
    <div class="container">
      <h2>Our Services</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <div class="card-body box-shadow">
              <h3 class="card-title"><i class="fas fa-book-open"></i> Fiction Collection</h3>
              <p class="card-text">Explore the world of fiction and imagination.</p>
              <div class="justify-content-between align-items-center">
                <!-- Link to view available fiction books -->
<!--                <router-link :to="{ name: 'BookList', params: { category: 'fiction' } }" class="custom-button">
                  <i class="fas fa-info-circle"></i> Explore
                </router-link>-->
                <p class="card-text mt-2">A variety of genres</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Repeat similar sections for non-fiction, reference, etc. -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
.jumbotron {
  ///background-image: url('../../assets/library-background.jpg');
  background-size: cover;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.card {
  min-height: 250px;
  background: #ffbd69;
  background-color: #ffbd69;
  --bs-card-bg: #ffbd69 !important;
}

.custom-button {
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-decoration: none;
}

.custom-button:hover {
  background-color: #0069d9;
}

.custom-button i {
  margin: 0.5rem;
}
</style>
