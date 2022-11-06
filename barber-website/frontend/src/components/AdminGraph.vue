<template>
  <v-card class="mb-4 rounded-xl">
    <v-row>
      <v-col>
        <v-card-title
          class="black--text"
          style="flex-direction: row; padding: auto"
        >
          <p class="text-center">Traffic</p>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Bar :chart-data="chartData" :chart-options="chartOptions" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
        backgroundColor: "rgba(153, 153, 153, 0.6)",
        borderWidth: 1,
        scales: {
          x: { display: false },
        },
        borderRadius: 30,
      },
    };
  },
  methods: {},
};
</script>
