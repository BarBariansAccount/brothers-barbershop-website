<template>
  <v-row justify="center">
    <v-dialog :v-model="signUpDialog" width="500px" height="750px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-2" text v-bind="attrs" v-on="on" depressed>
          <slot>Sign Up</slot>
        </v-btn>
      </template>
      <v-card height="750px" width="500px" color="#F9F9F9">
        <v-card-title class="text-h4 justify-center">
          <slot>Sign Up </slot>
        </v-card-title>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="First Name"
              placeholder="First Name"
              v-model="form.firstname"
              :autocomplete="false"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Last Name"
              placeholder="Last Name"
              v-model="form.lastname"
              :autocomplete="false"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Phone Number"
              placeholder="Phone Number"
              v-model="form.phoneNumber"
              type="phone"
              :autocomplete="false"
              :error-messages="errorPhoneNumber"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Email"
              placeholder="Email"
              v-model="form.email"
              type="email"
              :autocomplete="false"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Password"
              placeholder="Password"
              v-model="form.password"
              :error-messages="passwordErrorMessage"
              type="password"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              label="Confirm Password"
              placeholder="Confirm Password"
              v-model="form.confirmPassword"
              type="password"
              :error-messages="errorEmptyFields"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            color="black"
            outlined
            @click="signUp(form), $emit('BarberCreated')"
          >
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
      firstname: "",
      lastname: "",
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
      var userRole = "";
      console.log(`Signup pressed`);
      if (
        this.form.firstname == "" ||
        this.form.lastname == "" ||
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
      if (this.$route.fullPath != "/barbersManagement") {
        userRole = "Customer";
      } else userRole = "Barber";

      try {
        await axios.post(`http://localhost:5001/createUser_customers`, {
          UserRole: userRole,
          Email: form.email,
          LastName: form.lastname,
          FirstName: form.firstname,
          Telephone: form.phoneNumber,
          Password: form.password,
        });

        const loginResponse = await axios.post(`http://localhost:5001/Login`, {
          Telephone: form.phoneNumber,
          Password: form.password,
        });
        this.$store.commit("setToken", loginResponse.data.Token);
        this.$store.commit("setUser", loginResponse.data.User);
        console.log("User account was successfully created");

        /* TODO:
          - Surrround the emit with an if statement
          if the admin is the one creating the account than the value true should be emmited to Barbers management page
          otherwise EMIT FALSE
        */
        this.signUpDialog = false;
        this.$emit("BarberCreated", true);
        return (this.signUpValue = !this.signUpValue);
      } catch {
        console.log("In error occured while creating the user account");
      }
    },
  },
};
</script>

<style></style>
