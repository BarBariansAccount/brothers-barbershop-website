<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-sheet elevation="10" rounded="lg">
          <!-- title -->
          <v-sheet class="pa-3 primary" dark rounded="t-lg">
            <v-icon>mdi-view</v-icon>
            Appointment Detail
          </v-sheet>
          <!-- detail -->
          <div class="sheet-body text-center" v-if="detail">
            <div class="item" v-for="(item, i) in detail" :key="i">
              <span class="uppercase">
                {{ item.k }} :
              </span>
              <b>
                <span v-if="item.k == 'available date'">
                  {{ formatDate(item.v) }}
                </span>
                <span v-else-if="item.k == 'hour'">
                  {{ addAmPm(item.v) }}
                </span>
                <span v-else>{{ item.v }}</span>
              </b>
            </div>
          </div>
          <!-- action -->
          <div class="text-center">
            <v-btn @click="cancel" text color="error">
              <v-icon left> mdi-close </v-icon>
              cancel
            </v-btn>
            <v-btn text @click="edit" color="primary">
              <v-icon left> mdi-pen </v-icon>
              Edit
            </v-btn>
            <div>

              <v-btn text to="/appointment" color="primary" class="my-2">
                <v-icon left> mdi-plus </v-icon>
                Book another Appoitment
              </v-btn>
            </div>
          </div>
          <v-alert dense border="left" class="text-center" type="warning">
            For updating your date and hour , Cancel your appoitment first.
            Thank you!
          </v-alert>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appointmentService from "@/services/appointment";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loading: false,
      detail: [],
    };
  },
  methods: {
    async getDetail() {
      const token = this.$route.params.token;
      if (!token) return;
      this.detail = [];
      this.loading = true;
      try {
        const res = await appointmentService.appointmentDetail(token);
        for (let [k, v] of Object.entries(res.data[0])) {
          k = k.replaceAll("_", " ");
          const d = { k, v };
          this.detail.push(d);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "get detail",
          text: error?.response?.data,
        });
      }
      this.loading = false;
    },
    async cancel() {
      const token = this.$route.params.token;
      if (!token) return;
      this.loading = true;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await appointmentService.cancelAppointment(token);
            Swal.fire(
              "Deleted!",
              "Your appointment has been deleted.",
              "success"
            );
            this.$router.push({ name: "Appointment" });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "get detail",
              text: error?.response?.data,
            });
          }

          this.loading = false;
        }
      });
    },
    async edit() {
      const token = this.$route.params.token;
      if (!token) return;
      this.$router.push({ name: "Appointment", query: { token } });
    },
    addAmPm(hour) {
      if (hour < 12) return hour + ":00 AM";
      else if (hour == 12) return hour + ":00 PM";
      else return hour - 12 + ":00 PM";
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
<style scoped>
.sheet-body {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.item {
  border-bottom: 1px dashed gray;
  padding: 8px 0;
  display: inline;
}
.uppercase{
  text-transform: capitalize;
}
</style>