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
          <slot>Sign Up </slot>
        </v-card-title>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Full Name" placeholder="Full Name" v-model="form.fullname" :autocomplete="false" solo>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Phone Number" placeholder="Phone Number" v-model="form.phoneNumber" type="phone"
              :autocomplete="false" :error-messages="errorPhoneNumber" solo>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Email" placeholder="Email" v-model="form.email" type="email" :autocomplete="false"
              solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Password" placeholder="Password" v-model="form.password"
              :error-messages="passwordErrorMessage" type="password" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field label="Confirm Password" placeholder="Confirm Password" v-model="form.confirmPassword"
              type="password" :error-messages="errorEmptyFields" solo>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn class="white--text" color="#5f6bba" @click="signUp(form)">
            <slot>Sign Up </slot>
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    form: {
      fullname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    passwordErrorMessage: "",
    errorEmptyFields: "",
    errorPhoneNumber: "",
    signUpDialog: false,
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

    async signUp(form) {
      console.log(`Signup pressed`);
      if (
        this.form.fullname == "" ||
        this.form.email == "" ||
        this.form.phoneNumber == "" ||
        this.form.password == "" ||
        this.form.confirmPassword == ""
      ) {
        this.errorEmptyFields = "Please fill up all the fields";
        return;
      }
      if (!this.validatePhoneNumber()) {
        this.errorPhoneNumber = "Not a valid phone number";
        console.log(this.errorPhoneNumber);
        return;
      }

      if (this.form.confirmPassword != this.form.password) {
        this.passwordErrorMessage = "The password doesn't match";
        console.log(this.passwordErrorMessage);
        return;
      }
      try {
        await axios.post(`http://localhost:5001/createUser`, {
          UserRole: "Barber",
          Email: form.email,
          LastName: "",
          FirstName: form.fullname,
          Telephone: form.phoneNumber,
          Password: form.password,
        });
        console.log("User account was successfully created");
        return (this.signUpValue = !this.signUpValue);
      } catch {
        console.log("In error occured while creating the user account");
      }
    },
  },
};
</script>

<style>

</style>
