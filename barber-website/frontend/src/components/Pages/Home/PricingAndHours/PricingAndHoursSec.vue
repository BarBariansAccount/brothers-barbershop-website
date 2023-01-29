<template>
  <v-row class="work-hrs-pricing">
    <v-col
      cols="12"
      lg="6"
      class="d-flex flex-column justify-center align-center"
    >
      <p class="mb-5 font-weight-bold text-h3">Haircuts Pricing</p>
      <p class="font-weight-bold text-h6 text-center">
        Haircut (5$ off on Tuesdays, Wednesdays and Thursdays) | $35.00 - 45
        mins
      </p>
      <p class="font-weight-bold text-h6 text-center">
        Haircut + Beard (5$ off on Tuesdays, Wednesdays and Thursdays) | $40.00
        - 1 hour
      </p>
      <p class="font-weight-bold text-h6">Line-up | $15.00 - 30 mins</p>
      <p class="font-weight-bold text-h6">Beard Only | $15.00 - 30 mins</p>
      <p class="font-weight-bold text-h6">Line-up + beard | $20.00 - 30 mins</p>
    </v-col>
    <v-col
      cols="12"
      lg="6"
      class="d-flex flex-column justify-center align-center"
    >
      <v-card
        class="text-center d-flex flex-column align-center justify-center rounded-xl"
        height="450px"
        width="60%"
        color="#F7F7F7"
      >
        <h2 class="mb-4 mt-3">Working Hours</h2>
        <p>Sunday: CLOSED</p>
        <p>Monday: CLOSED</p>
        <p>Tuesday: 11am - 7pm</p>
        <p>Wednesday: 11am - 7pm</p>
        <p>Thursday: 11am - 7pm</p>
        <p>Friday: 11am - 7pm</p>
        <p>Saturday: 11am - 7pm</p>
        <v-btn color="black" class="mb-6 mt-2" @click="bookNow()" outlined
          >BOOK NOW</v-btn
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
  },
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
</style>
