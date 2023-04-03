<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      class="lighten-1 white--text text-center"
      color="#424949"
      width="100%"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          @click="clickIcon(icon)"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <strong>Address:</strong> 4961c Queen Mary Rd, Montreal, Quebec H3W 1X4
        <br />
        <strong>Phone:</strong> (514) 737-7788 <br />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Brothers' Barbershop</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer-component",
  data: () => ({
    icons: ["mdi-instagram"],
  }),
  methods: {
    clickIcon(icon) {
      if (icon == "mdi-instagram") {
        window.open("https://www.instagram.com/tk_hasdat/", "_blank");
      }
    },
  },
};
</script>