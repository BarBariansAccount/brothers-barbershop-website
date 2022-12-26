<template>
  <v-card :loading="loading">
    <AddAvailabilityModalVue v-model="showModal" />
    <!-- title -->
    <h3 class="d-flex justify-space-between align-center">
      Available
      <div>
        <v-btn @click="showModal = true" text color="success"
          ><v-icon left>mdi-plus</v-icon>Add</v-btn
        >
        <v-btn @click="del" text color="error"
          ><v-icon left>mdi-close</v-icon>Delete</v-btn
        >
      </div>
    </h3>
    <!-- date picker -->
    <v-menu
      ref="picker"
      v-model="picker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          style="width: 200px"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="picker = false"
      ></v-date-picker>
    </v-menu>
    <!-- list -->
    <v-data-table
      show-select
      v-model="selected"
      :single-expand="false"
      item-key="appointment_id"
      show-expand
      :expanded.sync="expanded"
      :headers="headers"
      :items="availables"
    >
      <!-- expand -->

      <template v-slot:expanded-item="{ item }">
        <td :colspan="5">
          <b> Customer </b>
          <div>
            Full Name :{{ item.customer_first_name }}
            {{ item.customer_last_name }} , Phone :
            {{ item.customer_telephone }} , Email : {{ item.customer_email }}
          </div>
          <div>
            {{ item.customer_appointment_notes }}
          </div>
        </td>
      </template>

      <!-- <template v-slot:item.booked="{ item }">
        <v-chip small :color="item.booked ? 'green' : 'red'" dark>
          {{ item.booked ? 'Yes' : 'No' }}
        </v-chip>
      </template> -->
    </v-data-table>

  </v-card>
</template>

<script>
// eslint-disable no-use-before-define
import AddAvailabilityModalVue from "./AddAvailabilityModal.vue";
import barbershopStatus from "@/services/barbershopStatus";
import Swal from "sweetalert2";
export default {
  components: { AddAvailabilityModalVue },
  data: () => ({
    availables: [],
    showModal: false,
    date: null,
    picker: false,
    loading: false,
    selected: [],
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "available_date",
      },
      { text: "Hour", value: "hour" },
      { text: "Booked", value: "booked" },
      { text: "Service", value: "service" },
      { text: "", value: "" },
    ],
    expanded: [],
  }),
  methods: {
    // get availabilities by date
    async get() {
      this.availables = [];
      const data = { Date: this.date };
      this.loading = true;
      try {
        const res = await barbershopStatus.getAvailabilities(data);
        if (res.data && res.data.length > 0 && typeof res.data == "object") {
          this.availables = res.data;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      }
      this.loading = false;
    },
    // delete
    del() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete them!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const aptIdsTodelete = [];
          this.selected.forEach((item) => {
            aptIdsTodelete.push(item.appointment_id);
          });
          this.loading = true;
          try {
            await barbershopStatus.delAvailabilities(aptIdsTodelete);
            this.get();
            this.selected = [];
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.response?.data,
            });
          }
          this.loading = false;
        }
      });
    },
  },
  watch: {
    // get availability on date change
    date() {
      this.get();
    },
  },
  mounted() {
    this.date = new Date().toISOString().split("T")[0];
    this.get();
  },
};
</script>

