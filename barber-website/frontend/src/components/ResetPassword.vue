<template>
  <v-card color="#F9F9F9" height="400px">
    <v-card-title class="text-h5 justify-center">
      <slot>
        Reset Password
      </slot>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Password"
        v-model="form.newPassword"
        placeholder="Password"
        type="password"
        :autocomplete="false"
      >
      </v-text-field>

      <v-text-field
        label="Confirm Password"
        v-model="form.confirmedPassword"
        placeholder="Confirm Password"
        type="password"
        :autocomplete="false"
        :error-messages="errorPassword"
      >
      </v-text-field>

      <v-row class="mt-7">
        <v-col cols="6">
          <v-btn color="black" block outlined @click="onSubmit()">
            Submit
          </v-btn>
        </v-col>

        <v-col>
          <v-btn color="red" block outlined @click="onCancel()">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserRegister from "@/services/user";

export default {
  props: {
    userData: {
      type: Object,
    },
  },

  data: () => ({
    form: {
      confirmedPassword: "",
      newPassword: "",
    },
    errorPassword: "",
  }),

  methods: {
    onCancel() {
      this.$emit("passwordChanged", false);
    },

    async onSubmit() {
      console.log(`Submit pressed `);
      if (this.form.confirmedPassword == "" || this.form.newPassword == "") {
        this.errorPassword = "Please fill both fields";
        return;
      } else if (this.form.confirmedPassword != this.form.newPassword) {
        this.errorPassword = "Password are not matching";
      } else {
        console.log(this.userData.data.Token, "token");
        const { userrole } = this.userData.data.User;
        this.$store.commit("setToken", this.userData.data.Token);

        await UserRegister.changePasswordForgottenPassword(
          {
            NewPassword: this.form.newPassword,
          },
          { headers: { Authorization: "Bearer " + this.userData.data.Token } }
        ).then(() => {
          this.$store.commit("setUser", this.userData.data.User);
          console.log("Rerouting to the home page");
          if (userrole == "Admin") {
            this.$router.push("/panel/admin");
          } else if (userrole == "Barber") {
            this.$router.push("/panel/barber");
          } else {
            this.$router.push("/panel");
          }
        });
      }
    },
  },
};
</script>
