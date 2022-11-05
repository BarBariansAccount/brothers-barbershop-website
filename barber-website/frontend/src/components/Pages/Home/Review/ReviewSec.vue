<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="mb-3 text-h2">Reviews</p>
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
};
</script>
<style>
.review-sec {
  margin-bottom: 100px;
}
</style>
