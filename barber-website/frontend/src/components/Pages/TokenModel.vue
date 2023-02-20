<template>
  <div>
    <v-card color="#F9F9F9" v-if="!showNewPasswordModal">
      <v-card-title class="text-h5 justify-center">
        <slot>
          Generated Code
        </slot>
        <v-card-text>
          The verification code is sent to your email
        </v-card-text>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Token"
          placeholder="Token"
          v-model="form.generatedPassword"
          type="text"
          autocomplete="false"
          :error-messages="errorPassword"
        >
        </v-text-field>
        <v-row class="mt-6">
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
    <ResetPassword v-if="showNewPasswordModal" :userData="userData" />
  </div>
</template>

<script>
import ResetPassword from "../ResetPassword.vue";
import UserRegister from "@/services/user";
export default {
  components: { ResetPassword },
  props: ["userTelephone"],
  data: () => ({
    userData: "",
    form: {
      generatedPassword: "",
    },
    showTokenForm: false,
    errorPassword: "",
    showNewPasswordModal: false,
  }),

  methods: {
    onCancel() {
      this.$emit("passwordChanged", false);
    },
    async onSubmit() {
      console.log(`Submit pressed `);
      if (this.form.generatedPassword == "") {
        this.errorPassword = "Please Enter the generated password";
        return;
      }
      try {
        const fetchGeneratedPasssword = await UserRegister.getGeneratedPassword(
          {
            Telephone: this.userTelephone,
            Reset_Code: this.form.generatedPassword,
          }
        );
        if (fetchGeneratedPasssword.status == "200") {
          this.showNewPasswordModal = true;
          console.log(fetchGeneratedPasssword);
          this.userData = fetchGeneratedPasssword;
        }
      } catch (error) {
        this.errorPassword = "Verification Code wrong";
        return;
      }
    },
  },
};
</script>
