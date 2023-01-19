<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="mb-1 text-h2">Reviews</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <v-btn @click="addReview()" class="mb-4"
          ><v-icon size="22">mdi-plus</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row class="review-sec">
      <v-col v-for="n in 3" :key="n" cols="12" md="4">
        <ReviewCard />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ReviewCard from "./ReviewCard.vue";
export default {
  components: {
    ReviewCard,
  },
  methods: {
    addReview() {
      window.open(
        "https://www.google.com/search?gs_ssp=eJwNxU0KgCAQBlDaBl0h3LTOT8SYjtAtHNMi6G8qsNvX27yyaqcWWDjBkBNd9I3ONgQCdREYHcDc6-wMJaZkgw4e8DzULPs9R7kUe-H_eT_U-cS4qdXL-wEvDhsS&q=brothers+barbershop+queen+mary&oq=broth&aqs=chrome.1.69i57j46i39i175i199j0i67i433j0i67j0i131i433i512j69i61l3.6392j0j7&sourceid=chrome&ie=UTF-8#lrd=0x4cc9197e11d611bb:0x629fb9f4c0ca11ab,3,,,,"
      );
    },
  },
};
</script>
<style>
.review-sec {
  margin-bottom: 100px;
}
</style>
