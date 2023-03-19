<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="mb-4 text-h2">Reviews</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="12" md="4">
        <ReviewCard :num="n" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <v-btn @click="addReview()" class="mb-4 mt-6"
          ><v-icon size="22">mdi-plus</v-icon></v-btn
        >
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
        "https://search.google.com/local/writereview?placeid=ChIJuxHWEX4ZyUwRqxHKwPS5n2I"
      );
    },
  },
};
</script>
