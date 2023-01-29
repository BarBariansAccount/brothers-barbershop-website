<template>
  <v-container class="mx-auto my-auto" fluid>
    <v-row class="slideshow-sec">
      <v-col cols="12" align="right">
        <v-card class="rounded-lg pa-4 text-center" width="290px"  :elevation="25">
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
  background: url("/images/barbershop_gif.gif") no-repeat;
  background-size: cover;
  height: 550px;
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
