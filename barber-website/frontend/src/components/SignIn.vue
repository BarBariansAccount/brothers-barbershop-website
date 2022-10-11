<template>
  <v-row justify="center">
    <v-dialog :v-model="signInDialog" width="500px" height="450px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> Sign In </v-btn>
      </template>
      <v-card height="450px" width="500px" color="#DBDDEF">
        <v-card-title class="text-h4 justify-center"> Sign In </v-card-title>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              class="mt-3"
              label="Phone Number"
              placeholder="Phone Number"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Password"
              placeholder="Password"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn class="mt-8 white--text" @click="signIn()" color="#5f6bba">
            Sign In
          </v-btn>
        </v-row>
        <v-row justify="center">
          <p class="mt-6">Don't have an account? <SignUp /></p>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SignUp from "./SignUp.vue";
export default {
  components: { SignUp },
  data: () => ({
    signInDialogValue: false,
  }),
};
</script>

<style></style>
