<template>
  <v-row justify="center">
    <v-dialog :v-model="signUpDialog" width="500px" height="650px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" depressed>
          <slot>Sign UP </slot>
        </v-btn>
      </template>
      <v-card height="650px" width="500px" color="#DBDDEF">
        <v-card-title class="text-h4 justify-center">
          <slot>Sign UP </slot>
        </v-card-title>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Full Name" placeholder="Full Name" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Phone Number" placeholder="Phone Number" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Email" placeholder="Email" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Password" placeholder="Password" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Confirm Password" placeholder="Confirm Password" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn class="white--text" @click="signUp()" color="#5f6bba">
            Sign Up
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    signUpDialog: false,
  }),
};
</script>

<style>

</style>
