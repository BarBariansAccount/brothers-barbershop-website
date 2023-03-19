<template>
  <div>
    <v-dialog v-model="dialog" width="500px" persistent>
      <v-card class="py-2">
        <div class="icon text-center pt-4">
          <v-avatar v-if="selectedImageData" size="120">
            <img :src="selectedImageData" />
          </v-avatar>
          <v-icon v-else size="140"> mdi-image </v-icon>
        </div>
        <v-btn ref="image" class="mt-3" block text @click="onSelect">
          <v-icon left color="blue">
            mdi-pencil
          </v-icon>
          Upload Photo
        </v-btn>
        <v-text-field
          class="pa-3"
          v-model="productTitle"
          label="Product tile"
          variant="underlined"
        ></v-text-field>
        <v-textarea
          class="pa-3"
          clearable
          clear-icon="mdi-close-circle"
          v-model="productText"
          color="black"
          label="Product Description"
        ></v-textarea>
        <v-row>
          <v-col
            cols="6"
            lg="6"
            class="d-flex flex-column justify-center align-center"
            ><v-btn color="blue" width="150px" @click="saveProduct()"
              >Save</v-btn
            ></v-col
          >
          <v-col
            cols="6"
            lg="6"
            class="d-flex flex-column justify-center align-center"
            ><v-btn color="primary" width="150px" @click="onCancel()"
              >Cancel</v-btn
            ></v-col
          >
        </v-row>
        <v-file-input
          accept="image/*"
          size="sm"
          v-show="false"
          v-model="file"
          ref="fileInput"
          truncate-length="15"
          @change="uploadPic"
        >
        </v-file-input>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <v-btn @click="dialog = true" class="mb-4">Add Product</v-btn>
      </v-col>
    </v-row>
    <AdminProductCard />
  </div>
</template>

<script>
import AdminProductCard from "./AdminProductCard.vue";
import productService from "../services/products";
import Swal from "sweetalert2";
export default {
  components: {
    AdminProductCard,
  },
  data() {
    return {
      dialog: false,
      file: null,
      productTitle: "",
      productText: "",
    };
  },
  computed: {
    selectedImageData() {
      return this.$store.state.selectedImageData;
    },
    selectedImageFile() {
      return this.$store.state.selectedImageFile;
    },
  },
  methods: {
    async saveProduct() {
      console.log(this.selectedImageFile);
      const formData = new FormData();
      formData.append("ProductsImage", this.selectedImageFile);
      formData.append("title", this.productTitle);
      formData.append("description", this.productText);
      try {
        await productService.addProduct(formData);
      } catch (err) {
        console.log(err);
      }
      this.$store.commit("resetSelectedImageData");
      this.$store.commit("resetSelectedImageFile");
      this.productText = "";
      this.productTitle = "";
      this.dialog = false;
    },
    onCancel() {
      this.$store.commit("resetSelectedImageData");
      this.$store.commit("resetSelectedImageFile");
      this.dialog = false;
    },
    onSelect() {
      this.$refs.fileInput.$refs.input.click();
    },
    uploadPic() {
      if (this.file.size > 200000) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry ! File Size cant be more than 200KB",
        });
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const imageData = reader.result;
        this.$store.commit("setSelectedImageData", imageData);
        this.$store.commit("setSelectedImageFile", this.file);
      };
    },
  },
  created() {
    this.$store.commit("resetSelectedImageData");
    this.$store.commit("resetSelectedImageFile");
  },
};
</script>

<style></style>
