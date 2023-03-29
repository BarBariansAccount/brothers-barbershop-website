<template>
  <v-row class="work-hrs-pricing">
    <v-col cols="12" lg="6" class="d-flex flex-column justify-center align-center">
      <p class="mb-5 font-weight-bold text-h3">Haircuts Pricing</p>

      <div class="font-weight-bold text-h6 text-center" v-for="(item, i) in items" :key="i">

        {{ item.service }} |

        <input class="act" type="text" v-if="i == selected && selected > -1" v-model="selectedItem['price']">
        <span v-else>{{ item.price }}</span> -

        <input class="act" type="text" v-if="i == selected && selected > -1" v-model="selectedItem['duration']">
        <span v-else>{{ item.duration }}</span>

        <v-btn v-if="selected == -1 && role == 'Admin'" color="blue" icon sm @click="onRow(item, i)">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        <v-btn v-if="selected > -1 && i == selected" color="success" icon sm @click="update">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn v-if="selected > -1 && i == selected" color="error" icon sm @click="reset(item, i)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

    </v-col>
    <v-col cols="12" lg="6" class="d-flex flex-column justify-center align-center">
      <v-card class="text-center d-flex flex-column align-center justify-center rounded-xl" height="450px" width="60%"
        color="#F7F7F7">
        <h2 class="mb-4 mt-3">Working Hours</h2>
        <div v-for="(d, i) in wh" :key="d.day">

          <span> {{ d.day }}</span>
          :
          <input v-if="i == selectedDayIndex" type="text" v-model="selectedDay['description']" class="act">
          <span v-else> {{ d.description }}</span>

          <v-btn v-if="selectedDayIndex == -1 && role == 'Admin'" color="blue" icon sm @click="onRow2(d, i)">
            <v-icon>mdi-pen</v-icon>
          </v-btn>
          <v-btn v-if="selectedDayIndex > -1 && i == selectedDayIndex" color="success" icon sm @click="updateHours">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="selectedDayIndex > -1 && i == selectedDayIndex" color="error" icon sm @click="reset2">
            <v-icon>mdi-close</v-icon>
          </v-btn>

        </div>
        <v-btn color="black" class="mb-6 mt-2" @click="bookNow()" outlined>BOOK NOW</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AdminService from '@/services/admin'
import Swal from "sweetalert2";
export default {
  data() {
    return {
      items: [],
      selected: -1,
      selectedItem: null,
      // working hours
      wh: [],
      selectedDayIndex: -1,
      selectedDay: null,
    };
  },
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
    // Prices
    onRow(item, index) {
      this.selected = index
      this.selectedItem = Object.assign({}, item)
    },
    reset() {
      this.selected = -1
      this.selectedItem = null
    },
    async update() {
      try {
        await AdminService.updatePrices(this.selectedItem)
        this.reset()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true
        })

        Toast.fire({
          icon: 'success',
          title: 'success',
          text: "updated successfully",
        })
        this.get()
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      }
    },
    async get() {
      try {
        const res = await AdminService.getPrices()
        this.items = res.data
        console.log(res);
      } catch (error) {
        console.log(error);

      }
    },
    // Working Hours
    async getWH() {
      try {
        const res = await AdminService.getWorkingHours()
        this.wh = res.data
      } catch (error) {
        console.log(error);
      }
    },
    onRow2(item, index) {
      this.selectedDayIndex = index
      this.selectedDay = Object.assign({}, item)
    },
    async updateHours() {
      try {
        await AdminService.updateWorkingHours(this.selectedDay)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true
        })

        Toast.fire({
          icon: 'success',
          title: 'success',
          text: "updated successfully",
        })
        this.reset2()
        this.getWH()
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      }
    },
    reset2() {
      this.selectedDayIndex = -1
      this.selectedDay = null
    },
  },
  mounted() {
    this.get()
    this.getWH()
  },
  computed: {
    role() {
      return this.$store.state?.user?.userrole
    }
  }
};
</script>

<style>
.work-hrs-pricing {
  /* border-color: red;
  border-style: solid; */
  margin-bottom: 100px;
  background: url("/images/bshop-5.jpg") no-repeat;
  background-size: cover;
  height: 950px;
}
.act{
background-color: rgb(208, 221, 251) !important;
border:1px solid rgb(72, 0, 255)
}

.colored-toast.swal2-icon-success {
  background-color: rgb(147, 206, 147) !important;
}
</style>
