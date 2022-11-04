<template>
  <v-footer dark padless>
    <v-card flat tile class="lighten-1 white--text text-center" color="#424949">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. <br />
        <strong>Address:</strong> 4961c Queen Mary Rd, Montreal, Quebec H3W 1X4
        <br />
        <strong>Phone:</strong> (514) 737-7788 <br />
        <strong>Interested in pursuing your career as a barber?</strong> Contact
        us or come see us!
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
    icons: ["mdi-facebook", "mdi-instagram"],
  }),
};
</script>
<style></style>
