<template>
  <div class="backgroud-c">
    <v-container>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n1">
        <v-spacer></v-spacer>

        <v-item-group mandatory class="mt-n4">
          <v-row justify="center">
            <v-col v-for="status in statusItems" :key="status.title">
              <v-item v-slot="{ active, toggle }">
                <v-btn
                  :color="active ? 'green' : '#999999'"
                  rounded
                  dark
                  class="rounded-xl"
                  elevation="20"
                  @click="toggle"
                  @click.stop="onSelect(status.title)"
                >
                  <!--TODO: add selectStatus(status.title) -->
                  {{ status.title }}
                </v-btn>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-toolbar>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title>Overview</v-toolbar-title>
      </v-toolbar>

      <v-item-group mandatory class="mt-n4">
        <v-row justify="center">
          <v-col cols="12" md="2" v-for="items in menuItems" :key="items.title">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#999999' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
                @click.stop="onCardMenuSelect(items.title)"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon
                            x-large
                            :color="active ? 'white' : '#999999'"
                            >{{ items.icons }}</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >{{ items.title }}</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                        >
                          <strong>52</strong>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <v-container v-if="menuItemSelected == 'BARBERS'">
      <BarbersManagementPageVue></BarbersManagementPageVue>
    </v-container>
    <v-container v-else>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title>Quick view</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col md="6">
          <v-card class="mb-4 rounded-xl">
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="9"
              item-key="name"
              height="480"
              max-height="450"
              :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus',
              }"
            ></v-data-table>
          </v-card>
        </v-col>
        <v-col md="6">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BarbersManagementPageVue from "./BarbersManagementPage.vue";
import {
  mdiFinance,
  mdiAccountTie,
  mdiImage,
  mdiInformationOutline,
  mdiCalendar,
  mdiAccountGroupOutline,
} from "@mdi/js";
import BarbershopStatusService from "@/services/barbershopStatus";
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
  components: { Bar, BarbersManagementPageVue },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 350,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Barbers",
          align: "start",
          value: "name",
        },
        { text: "Active", value: "category" },
      ],
      desserts: [
        {
          name: "TK",
          category: "Active",
        },
        {
          name: "Ten-Hag",
          category: "Active",
        },
        {
          name: "Booba",
          category: "Not Active",
        },
        {
          name: "Zidane",
          category: "Not Active",
        },
        {
          name: "Barthez",
          category: "Not Active",
        },
        {
          name: "Rick",
          category: "Active",
        },
        {
          name: "Ali",
          category: "Active",
        },
        {
          name: "Abdi",
          category: "Not Active",
        },
        {
          name: "Nafis",
          category: "Not Active",
        },
        {
          name: "Yousha",
          category: "Not Active",
        },
      ],
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
      statusItems: [
        { title: "Empty" },
        { title: "Busy" },
        { title: "Not Busy" },
      ],

      menuItems: [
        {
          title: "OVERVIEW",
          icons: mdiInformationOutline,
        },
        {
          title: "BARBERS",

          icons: mdiAccountGroupOutline,
        },
        { title: "CLIENTS", icons: mdiAccountTie },
        { title: "APPOINTMENT", icons: mdiCalendar },
        { title: "GALLERY", icons: mdiImage },
        { title: "STATS", icons: mdiFinance },
      ],
      menuItemSelected: "",
    };
  },
  methods: {
    onCardMenuSelect(menuItem) {
      console.log(menuItem);
      this.menuItemSelected = menuItem;
    },
    onSelect(status) {
      console.log(status);
      //this.updateStatus(status);
    },
    async updateStatus(status) {
      await BarbershopStatusService.updateStatus({ Status: status });
    },
  },
};
</script>

<style>
.backgroud-c {
  /* background-color: #999999; */

  background-size: cover;
}
</style>
