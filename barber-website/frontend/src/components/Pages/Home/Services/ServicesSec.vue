<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" class="d-flex flex-column justify-center align-center">
        <p class="mb-3 text-h2">Our Services</p>
      </v-col>
    </v-row>
    <v-row class="haircut-types">
      <v-col cols="6" lg="3" class="d-flex flex-column justify-center align-center">
        <v-card class="text-center d-flex flex-column align-center justify-center rounded-xl" height="85%" width="80%"
          color="#F7F7F7" to="/appointment">
          <img class="haircut-types-image" src="/images/hair.png" />
          <p class="font-weight-bold mt-3 text-h5">Haircut</p>
        </v-card>
      </v-col>
      <v-col cols="6" lg="3" class="d-flex flex-column justify-center align-center">
        <v-card class="text-center d-flex flex-column align-center justify-center rounded-xl" height="85%" width="80%"
          color="#F7F7F7" to="/">
          <img class="haircut-types-image-2" src="/images/braids.png" />
          <p class="font-weight-bold mt-6 text-h5">Braids
          </p>
           <!-- add temprory messg for Braids service -->
          <div class="text-error">
            <v-chip
            class="ma-2"
            color="red"
            text-color="white">
          <div>Currently not available, </div>
          <div>contact barbershop directly</div></v-chip>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" lg="3" class="d-flex flex-column justify-center align-center">
        <v-card class="text-center d-flex flex-column align-center justify-center rounded-xl" height="85%" width="80%"
          color="#F7F7F7" to="/appointment">
          <img class="haircut-types-image-2" src="/images/beard.png" />
          <p class="font-weight-bold mt-6 text-h5">Beard</p>
        </v-card>
      </v-col>
      <v-col cols="6" lg="3" class="d-flex flex-column justify-center align-center">
        <v-card class="text-center d-flex flex-column align-center justify-center rounded-xl" height="85%" width="80%"
          color="#F7F7F7" to="/appointment">
          <img class="haircut-types-image" src="/images/hairdress.png" />
          <p class="font-weight-bold mt-3 text-h5">Line-Up</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.haircut-types {
  height: 500px;
}

.haircut-types-image {
  height: 70px;
  width: 70px;
}

.haircut-types-image-2 {
  height: 70px;
  width: 70px;
}
.v-card{
  transition: all 0.4s;
}
.v-card:hover{
  transform: translateY(-20px);
/* background-color: rgba(206, 255, 194, 0.2) !important; */
}
</style>
