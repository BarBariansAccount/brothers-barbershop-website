<template>
  <div class=" bg-white">
    <h3>Appoinments</h3>
    <v-data-table :loading="loading" :headers="headers" :items="appointments" :items-per-page="9"
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
        {{ item.customer_first_name + ' ' + item.customer_last_name }}
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
  </div>
</template>

<script>
import Admin from '@/services/admin';
import Swal from "sweetalert2";
export default {
  data: () => ({
    appointments: [],
    loading: false,
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
  }),
  methods: {
    async get() {
      const barberid = this.$store.state.user.userid
      this.appointments = [];
      this.loading = true;
      try {
        const res = await Admin.getAllAppointments(barberid)
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
    addAmPm(hour) {
      if (hour < 12) return hour + ":00 AM";
      else if (hour == 12) return hour + ":00 PM";
      else return hour - 12 + ":00 PM";
    },
  },
  mounted() {
    this.get()
  }
}
</script>