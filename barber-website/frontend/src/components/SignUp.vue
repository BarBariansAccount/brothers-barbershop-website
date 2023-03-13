<template>
  <v-dialog v-model="signUpDialog" width="400px" height="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mt-2" text v-bind="attrs" v-on="on" depressed>
        <slot>
          Sign Up
        </slot>
      </v-btn>
    </template>
    <v-card height="600px" width="400px" color="#F9F9F9">
      <v-card-title class="text-h4 justify-center">
        <slot>
          Sign Up
        </slot>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="First Name"
          placeholder="First Name"
          v-model="form.firstname"
          :autocomplete="false"
        >
        </v-text-field>

        <v-text-field
          label="Last Name"
          placeholder="Last Name"
          v-model="form.lastname"
          :autocomplete="false"
        >
        </v-text-field>

        <v-text-field
          label="Phone Number"
          placeholder="Phone Number"
          v-model="form.phoneNumber"
          type="phone"
          :autocomplete="false"
          :error-messages="errorPhoneNumber"
        >
        </v-text-field>

        <v-text-field
          label="Email"
          placeholder="Email"
          v-model="form.email"
          type="email"
          :autocomplete="false"
        ></v-text-field>

        <v-text-field
          label="Password"
          placeholder="Password"
          v-model="form.password"
          :error-messages="passwordErrorMessage"
          type="password"
        ></v-text-field>

        <v-text-field
          label="Confirm Password"
          placeholder="Confirm Password"
          v-model="form.confirmPassword"
          type="password"
          :error-messages="errorEmptyFields"
        >
        </v-text-field>

        <v-btn
          class="mt-5"
          color="black"
          block
          outlined
          @click="signUp(form), $emit('BarberCreated')"
        >
          Sign Up
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import UserRegister from "@/services/user";
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
      try {
        if (this.$store.state.user == null) {
          console.log("creating a customer account");
          await UserRegister.createCustomerAccount({
            UserRole: "Customer",
            Email: form.email,
            LastName: form.lastname,
            FirstName: form.firstname,
            Telephone: form.phoneNumber,
            Password: form.password,
          });
          const loginResponse = await UserRegister.login({
            Telephone: form.phoneNumber,
            Password: form.password,
          });
          this.$store.commit("setToken", loginResponse.data.Token);
          this.$store.commit("setUser", loginResponse.data.User);
        } else if (
          this.$store.state.user &&
          this.$store.state.user.userrole == "Admin"
        ) {
          console.log("creating a Barber account");
          await UserRegister.CreateBarberOrAdmin({
            UserRole: "Barber",
            Email: form.email,
            LastName: form.lastname,
            FirstName: form.firstname,
            Telephone: form.phoneNumber,
            Password: form.password,
          });
          this.signUpDialog = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `The Barber ${form.lastname} has been added successfully `,
            showConfirmButton: false,
            timer: 1500,
          });
          this.form.email = "";
          this.form.lastname = "";
          this.form.firstname = "";
          this.form.phoneNumber = "";
          this.form.password = "";
          this.form.confirmPassword = "";
        }
        this.$emit("BarberCreated", true);
      } catch (error) {
        console.log("In error occured while creating the user account");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
