<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="mb-3 text-h2">FAQs</p>
      </v-col>
    </v-row>
    <v-row class="review-sec">
      <FaqCard :isContentEditableByTheUser="false" />
    </v-row>
  </v-container>
</template>
<script>
import FaqCard from "./FaqCard.vue";
export default {
  components: {
    FaqCard,
  },
};
</script>
<style></style>
