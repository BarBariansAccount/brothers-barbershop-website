<template>
  <v-container class="mx-auto my-auto" fluid>
    <v-row class="slideshow-sec">
      <v-col
        cols="12"
        lg="6"
        class="d-flex flex-column justify-center align-center"
      >
        <v-btn class="book-now-btn" @click="bookNow()" height="50px"
          >BOOK A HAIRCUT NOW</v-btn
        >
      </v-col>
      <v-col cols="12" lg="6" align="right">
        <v-card class="rounded-lg" width="250px">
          Barbershop Current Status: <strong>{{ status }}</strong> <br />
          Next Availability: <strong>{{ nextAvailability }}</strong>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["status", "nextAvailability"],
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
  },
};
</script>
<style>
.slideshow-sec {
  background: url("../../../../assets/barbershop_gif.gif") no-repeat;
  background-size: cover;
  height: 950px;
}
.book-now-btn {
  padding: 1rem 2.7rem;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: #96baff;
  border: 3px solid #121212;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 5px 5px 0px #000000;
}
</style>
