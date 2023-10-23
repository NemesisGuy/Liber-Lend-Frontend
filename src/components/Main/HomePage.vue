<template>

    <div>
        <button @click="goToBooks">View Books</button>
        <button @click="goToCustomers">View Customers</button>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
      goToBooks() {
            this.$router.push('/books');
        },
        goToCustomers() {
            this.$router.push('/customers');
        }
    }
}
</script>