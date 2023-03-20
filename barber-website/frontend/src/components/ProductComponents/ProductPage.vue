<template>
  <v-container class="product-view ">
    <v-row>
      <v-col v-for="product in productsList" :key="product.id">
        <v-card :loading="loading" class="mx-auto my-3" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="product.imageLink"></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="product.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ product.rating }} (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>

            <div>
              {{ product.description }}
            </div>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    productsList: [
      {
        id: 1,
        name: "bandito",
        description:
          "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating",
        imageLink: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        rating: 1,
      },
      {
        id: 2,
        name: "bandito",
        description:
          "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating",
        imageLink: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        rating: 4.5,
      },
      {
        id: 3,
        name: "bandito",
        description:
          "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating",
        imageLink: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        rating: 3.5,
      },
      {
        id: 4,
        name: "bandito",
        description: "Yours to discover",
        imageLink: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        rating: 3.5,
      },
    ],
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
<style>
.product-view {
  /* height: 100%; */
  flex-grow: 1;
  margin: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}
</style>
