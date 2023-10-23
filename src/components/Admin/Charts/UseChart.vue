<template>
  <div class="chart">
    <LoadingModalSection :show="isLoading"> Loading chart... </LoadingModalSection>
    <Doughnut v-if="!isLoading && chartData" :data="chartData" :options="chartOptions"/>
  </div>
</template>


<script>
import { Chart as ChartJS, ArcElement, CategoryScale,Legend, LinearScale, Title, Tooltip,} from 'chart.js'
import {Bar, Doughnut} from 'vue-chartjs'

import {fetchRentalsData} from "@/components/Admin/Charts/rentalsApi";
import LoadingModalSection from "@/components/Main/Modals/LoadingModalSection.vue";


ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale)


export default {
  name: 'BookPopularityChart',
  components: {Bar, LoadingModalSection, Doughnut},
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
      },
      isLoading: false,
    };
  },
  async mounted() {
    try {
      this.isLoading = true; // Show loading modal
      const data = await fetchRentalsData();
      if (data) {
        const bookPopularity = countBookPopularity(data); // Count book popularity based on the data
        this.chartData = {
          labels: Object.keys(bookPopularity), // Book models as labels
          datasets: [
            {
              label: 'Book Popularity',
              data: Object.values(bookPopularity), // Popularity values
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ], // Custom colors for the pie slices
            },
          ],
        };
      } else {
        // Handle error case
        console.error('Error fetching rentals data');
      }
    } catch (error) {
      console.error('Error fetching rentals data:', error);
      // Handle error case
    }
    finally {
      this.isLoading = false; // Hide loading modal
    }
  },
};

// Function to count book popularity based on the data
function countBookPopularity(data) {
  const bookPopularity = {};
  data.forEach((rental) => {
    const bookTitle = rental.book.title;
    if (bookPopularity[bookTitle]) {
      bookPopularity[bookTitle]++;
    } else {
      bookPopularity[bookTitle] = 1;
    }
  });
  return bookPopularity;
}
</script>
