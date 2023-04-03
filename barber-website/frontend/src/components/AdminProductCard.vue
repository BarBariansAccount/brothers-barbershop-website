<template>
  <v-row>
    <v-card class="py-2" height="400px" width="350px">
      <div class="icon text-center pt-4">
        <v-avatar size="120">
          <img :src="productImage" />
        </v-avatar>
      </div>
      <v-card-title class="align-center">{{ productTitle }}</v-card-title>
      <v-card-text class="text-center">
        {{ productDesc }}
      </v-card-text>
      <v-row align="center" justify="center">
        <v-btn color="primary" @click="onDeleteProduct()">Delete</v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import productService from "../services/products";
import Swal from "sweetalert2";
export default {
  props: {
    productImage: {
      type: String,
    },
    productDesc: {
      type: String,
    },
    productId: {
      type: Number,
    },
    productTitle: {
      type: String,
    },
  },
  data() {
    return {};
  },

  methods: {
    async onDeleteProduct() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log(this.productId);
            await productService.deleteProduct({ productsid: this.productId });
            this.$emit("onChildClick");
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
  },
};
</script>