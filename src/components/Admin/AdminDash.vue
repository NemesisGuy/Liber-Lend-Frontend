<script setup>

import RentalChart from './Charts/RentalChart.vue'
import UseChart from './Charts/UseChart.vue'
import PieChart from './Charts/PieChart.vue'
import RentalDurations from "@/components/Admin/Charts/RentalDurations.vue";

</script>

<template>
  <div class="content-container">
    <div >
       <h1>Admin Dash</h1>
    </div>

    <div class="graph-container">
      <h1>Rentals Over Time</h1>
      <RentalChart />
    </div>

    <div class="graph-container">
      <h1>Book Usage </h1>
      <UseChart />
    </div>
    <div class="graph-container">
      <h1>Book Category Groups </h1>
      <PieChart />
    </div>
    <div class="graph-container">
      <h1>Rental Durations </h1>
      <RentalDurations />
    </div>


  </div>


</template>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  margin: 2rem;

}



</style>