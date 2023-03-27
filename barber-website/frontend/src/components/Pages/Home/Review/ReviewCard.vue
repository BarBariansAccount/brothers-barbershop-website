<template>
  <div>
    <v-card v-if="num == 1" class="mx-auto rounded-xl" color="#F7F7F7" height="370px">
      <v-card-text class="text-center">
        <v-avatar size="90" class="mt-6 mb-2">
          <v-icon size="90">mdi-account-circle</v-icon>
        </v-avatar>
        <h3 class="my-2 text-center font-weight-bold">Aditya Pulya</h3>

        <div class="my-2 text-center">
          <v-rating :value="5" color="amber" dense half-increments readonly size="20"></v-rating>
        </div>

        <div class="text-center mt-3">
          Never seen a barber shop with a pool table before. Everyone is so cool
          and friendly. Does a great job with the usually prevalent prices
        </div>
      </v-card-text>
    </v-card>
    <v-card v-if="num == 2" class="mx-auto rounded-xl" color="#F7F7F7" height="370px">
      <v-card-text class="text-center">
        <v-avatar size="90" class="mt-6 mb-2">
          <v-icon size="90">mdi-account-circle</v-icon>
        </v-avatar>
        <h3 class="my-2 text-center font-weight-bold">John Arumugam (Arumu)</h3>

        <div class="my-2 text-center">
          <v-rating :value="5" color="amber" dense half-increments readonly size="20"></v-rating>
        </div>

        <div class="text-center mt-3">
          This is your one stop shop for haircuts. I’ve been coming to get
          haircuts with the barber TK for 2-3 years, and I’m a regular. As a
          perfectionist it’s important for my cuts to be on point. Skin fade,
          beard line up, trim the top, curls or blow dry, he gets it done on
          point each time... Loving it.
        </div>
      </v-card-text>
    </v-card>
    <v-card v-if="num == 3" class="mx-auto rounded-xl" color="#F7F7F7" height="370px">
      <v-card-text class="text-center">
        <v-avatar size="90" class="mt-6 mb-2">
          <v-icon size="90">mdi-account-circle</v-icon>
        </v-avatar>
        <h3 class="my-2 text-center font-weight-bold">fdeyab</h3>

        <div class="my-2 text-center">
          <v-rating :value="5" color="amber" dense half-increments readonly size="20"></v-rating>
        </div>

        <div class="text-center mt-3">
          Best barber I've ever had, hands down. The level of skill here is
          nothing short of amazing and they put in the time and effort to make
          sure you're getting the best experience possible. Never once had an
          issue and always left with the freshest cut. Easy 10/10 in every
          aspect.
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    num: Number,
  },
  data: () => ({
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
<style scoped>
.v-card{
  transition: all 0.2s;
}
.v-card:hover{
transform: scale(1.02);
}
</style>
