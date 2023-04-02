<template>
  <v-dialog width="400px" height="420px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on"> Sign In </v-btn>
    </template>
    <v-card height="420px" width="400px" color="#F9F9F9">
      <v-card-title class="text-h4 justify-center"> Sign In </v-card-title>
      <v-card-text>
        <v-text-field
          class="mt-3"
          label="Phone Number"
          placeholder="Phone Number"
          v-model="form.phoneNumber"
          :error-messages="invalidPhoneNumber"
          @keydown.enter="signIn"
        >
        </v-text-field>

        <v-text-field
          label="Password"
          placeholder="Password"
          type="password"
          :error-messages="errorNumberOrPassword"
          v-model="form.password"
          @keydown.enter="signIn"
        ></v-text-field>

        <v-btn class="mt-8" text block @click="signIn()" color="black" outlined>
          Sign In
        </v-btn>

        <div class="mt-6 text-center">
          <div>Don't have an account?</div>
          <SignUp />
          <div><ForgotPassword /></div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import SignUp from "./SignUp.vue";
import ForgotPassword from "./Pages/ForgotPassword.vue";
import UserRegister from "@/services/user";
export default {
  components: { SignUp, ForgotPassword },
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
      // This type of valication is not standard , you can use Vee-Validate(V.3) fot it
      if (!this.validatePhoneNumber()) {
        console.log("I'm in here");
        this.invalidPhoneNumber = "Invalid Phone number";
        return;
      }
      try {
        console.log(this.form.password);
        const data = await UserRegister.login({
          Telephone: this.form.phoneNumber,
          Password: this.form.password,
        });

        // save token and user id in the store , for any request we need  to attach its token
        this.$store.commit("setToken", data.data.Token);
        this.$store.commit("setUser", data.data.User);
        const { userrole } = data.data.User;
        console.log(userrole);
        if (userrole == "Admin") {
          this.$router.push("/panel/admin");
        } else if (userrole == "Barber") {
          this.$router.push("/panel/appointments");
        } else {
          this.$router.push("/panel/orders");
        }
      } catch (error) {
        this.errorNumberOrPassword = "Wrong phone Number or Password ";
        console.log(error.message);
      }
    },
  },
};
</script>
