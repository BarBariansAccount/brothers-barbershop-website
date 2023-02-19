<template>
  <v-card class=" rounded-xl">
    <v-card-text>
      <v-row>
        <!-- barber -->
        <v-col cols="12" md="6">
          <v-select dense :loading="loading1" v-model="selectedBarber" label="Select Barber" item-text="lastname"
            item-value="userid" :items="barbers" @change="getAvailHours">
            <template v-slot:item="{ item }">
              {{ item.firstname + ' ' + item.lastname }}
            </template>
            <template v-slot:selection="{ item }">
              {{ item.firstname + ' ' + item.lastname }}
            </template>
          </v-select>
        </v-col>
        <!-- date -->
        <v-col cols="12" md="6">
          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" dense label="Select Date" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" dense @input="menu2 = false, getAvailHours()"></v-date-picker>
          </v-menu>
        </v-col>
        <!-- table -->
        <v-col cols="12">
          <v-data-table :loading="loading2" dense :headers="headers" :items="availHours" :items-per-page="9"
            item-key="appointment_id" height="480" max-height="450">
            <template v-slot:item.hour="{ item }">
              {{ addAmPm(item.hour) }}
            </template>
            <template v-slot:item.booked="{ item }">
              <v-chip small :color="item.booked ? 'green' : 'red'" dark>
                {{ item.booked ? 'Yes' : 'No' }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import appointmentService from "@/services/appointment";
import Swal from "sweetalert2";
export default {
  name: "AdminTable",
  data() {
    return {
      headers: [
        {
          text: "hour",
          value: "hour",
        },
        { text: "booked", value: "booked" },
      ],
      availHours: [],
      loading1: false,
      loading2: false,
      barbers: [],
      selectedBarber: -1,
      menu2: false,
      date: null
    };
  },
  methods: {
    async getAvailHours() {
      if (!this.selectedBarber || !this.date) {
        return
      }
      this.availHours = [];
      this.loading2 = true;
      try {
        const res = await appointmentService.getBarberAvailHours(
          this.selectedBarber,
          this.date
        );
        this.availHours = res.data;
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "get Avail Hours",
          text: error?.response?.data,
        });
      }
      this.loading2 = false;
    },
    async getBarbers() {
      this.barbers = [];
      this.loading1 = true;
      try {
        const res = await appointmentService.getBarbers();
        this.barbers = res.data;
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "get barber list",
          text: error?.response?.data,
        });
      }
      this.loading1 = false;
    },
    addAmPm(hour) {
      if (hour < 12) return hour + ":00 AM";
      else if (hour == 12) return hour + ":00 PM";
      else return hour - 12 + ":00 PM";
    },
  },
  mounted() {
    this.getBarbers()
  }
};
</script>
