<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        lg="12"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="mb-3 text-h2">Our Services</p>
      </v-col>
    </v-row>
    <v-row class="haircut-types">
      <v-col
        cols="6"
        lg="3"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card
          class="text-center d-flex flex-column align-center justify-center rounded-xl"
          height="85%"
          width="80%"
          color="#F7F7F7"
          to="/appointment"
        >
          <img class="haircut-types-image" src="../../../../assets/hair.png" />
          <p class="font-weight-bold mt-3 text-h5">Haircut</p>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        lg="3"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card
          class="text-center d-flex flex-column align-center justify-center rounded-xl"
          height="85%"
          width="80%"
          color="#F7F7F7"
          to="/appointment"
        >
          <img
            class="haircut-types-image-2"
            src="../../../../assets/braids.png"
          />
          <p class="font-weight-bold mt-6 text-h5">Braids</p>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        lg="3"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card
          class="text-center d-flex flex-column align-center justify-center rounded-xl"
          height="85%"
          width="80%"
          color="#F7F7F7"
          to="/appointment"
        >
          <img
            class="haircut-types-image-2"
            src="../../../../assets/beard.png"
          />
          <p class="font-weight-bold mt-6 text-h5">Beard</p>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        lg="3"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card
          class="text-center d-flex flex-column align-center justify-center rounded-xl"
          height="85%"
          width="80%"
          color="#F7F7F7"
          to="/appointment"
        >
          <img
            class="haircut-types-image"
            src="../../../../assets/hairdress.png"
          />
          <p class="font-weight-bold mt-3 text-h5">Line-Up</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.haircut-types {
  height: 500px;
}

.haircut-types-image {
  height: 100px;
  width: 100px;
}

.haircut-types-image-2 {
  height: 80px;
  width: 80px;
}
</style>
