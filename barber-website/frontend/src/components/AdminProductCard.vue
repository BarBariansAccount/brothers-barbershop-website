<template>
  <v-row>
    <v-card class="py-2" height="400px" width="350px">
      <div class="icon text-center pt-4">
        <v-avatar v-if="picturelink" size="120">
          <img :src="picturelink" />
        </v-avatar>
        <v-icon v-else size="140"> mdi-image </v-icon>
      </div>
      <v-card-title class="align-center">Product Title</v-card-title>
      <v-card-text class="text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero sequi
        minus odit voluptates modi illum rerum sunt consequuntur aspernatur
        incidunt, sint, et nesciunt exercitationem atque officia suscipit
        accusantium. Harum, veritatis.
      </v-card-text>
      <v-row align="center" justify="center">
        <v-btn color="primary">Delete</v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
