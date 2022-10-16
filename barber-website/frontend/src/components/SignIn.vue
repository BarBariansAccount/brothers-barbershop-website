<template>
  <v-row justify="center">
    <v-dialog width="500px" height="450px">
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
              v-model="form.phoneNumber"
              :error-messages="invalidPhoneNumber"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Password"
              placeholder="Password"
              type="password"
              :error-messages="errorNumberOrPassword"
              v-model="form.password"
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
          <p class="mt-6">
            Don't have an account?
            <SignUp />
          </p>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import SignUp from "./SignUp.vue";
export default {
  components: { SignUp },
  data: () => ({
    signInDialogValue: false,
    form: {
      phoneNumber: "",
      password: "",
    },
    errorNumberOrPassword: "",
    invalidPhoneNumber: "",
  }),
  methods: {
    validatePhoneNumber() {
      const validationRegex = /^\d{10}$/;
      if (this.form.phoneNumber.match(validationRegex)) {
        return true;
      } else {
        return false;
      }
    },
    async signIn() {
      this.errorNumberOrPassword = "";
      this.invalidPhoneNumber = "";
      if (this.form.phoneNumber == "" || this.form.password == "") {
        this.errorNumberOrPassword = "Please fill up the fields";
        return;
      }
      if (!this.validatePhoneNumber()) {
        console.log("I'm in here");
        this.invalidPhoneNumber = "Invalid Phone number";
        return;
      }
      try {
        console.log(this.form.password);
        const data = await axios.post(`http://localhost:5001/Login`, {
          Telephone: this.form.phoneNumber,
          Password: this.form.password,
        });

        console.log(data.data[0]);
      } catch (error) {
        this.errorNumberOrPassword = "Wrong phone Number or Password ";
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
