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

          <v-img height="250" :src="product.picturelink"></v-img>

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
import product from "@/services/products";
export default {
  data: () => ({
    productsList: [],
    loading: false,
    selection: 1,
  }),

  methods: {
    async getAllproducts() {
      var list;
      try {
        list = await product.getAllProducts();
        this.productsList = list.data;
        console.log(this.productsList);
      } catch (err) {
        console.log(err);
      }
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
  created: function() {
    this.getAllproducts();
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
