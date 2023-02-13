<template>
  <v-card class=" rounded-xl">
    <v-card-text>
      <v-select dense :loading="loading2" label="Select Barber" item-text="lastname" item-value="userid"
        :items="barbers" @change="get">
        <template v-slot:item="{ item }">
          {{ item.firstname + ' ' + item.lastname }}
        </template>
        <template v-slot:selection="{ item }">
          {{ item.firstname + ' ' + item.lastname }}
        </template>
      </v-select>
      <v-data-table :loading="loading2" dense :headers="headers" :items="appointments" :items-per-page="9"
        item-key="appointment_id" height="480" max-height="450" show-expand :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }">
        <template v-slot:[`item.available_date`]="{ item }">
          {{ item.available_date.split('T')[0] }}
        </template>
        <template v-slot:[`item.customer_first_name`]="{ item }">
          {{ item.customer_first_name + ' ' +item.customer_last_name }}
        </template>
        <template v-slot:[`item.hour`]="{ item }">
          {{ addAmPm(item.hour) }}
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div>
              Customer First Name :{{ item.customer_first_name }}
            </div>
            <div>
              Customer Last Name :{{ item.customer_last_name }}
            </div>
            <div>
              Customer Phone :{{ item.customer_telephone }}
            </div>
            <div>
              Customer Note :{{ item.customer_appointment_notes }}
            </div>
            <div>
              Customer Email :{{ item.customer_email }}
            </div>
          </td>
        </template>
      </v-data-table>

    </v-card-text>
  </v-card>
</template>

<script>
import Admin from '@/services/admin';
import appointmentService from "@/services/appointment";
import Swal from "sweetalert2";
export default {
  name: "AdminTable",
  data() {
    return {
      headers: [
        {
          text: "date",
          align: "start",
          value: "available_date",
        },
        {
          text: "hour",
          value: "hour",
        },
             { text: "Customer", value: "customer_first_name" },
        { text: "Service", value: "service" },
      ],
      appointments: [],
      loading1: false,
      loading2: false,
      barbers: [],
      selectedBarber: -1
    };
  },
  methods: {
    async get(UserID) {
      // console.log('v', v);
      // return
      this.appointments = [];
      this.loading = true;
      try {
        const res = await Admin.getAllAppointments(UserID)
        this.appointments = res.data;
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
