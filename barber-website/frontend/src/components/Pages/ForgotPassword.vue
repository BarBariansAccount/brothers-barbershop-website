<template>
  <v-dialog v-model="ForgotPasswordDialog" width="400px" height="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" link x-small>
        <slot>
          Forgot Password ?
        </slot>
      </v-btn>
    </template>
    <v-card v-if="!showTokenForm" height="250px" width="500px" color="#F9F9F9">
      <v-card-title class="text-h4 justify-center">
        <slot>
          Reset Password
        </slot>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Phone Number"
          placeholder="Phone Number"
          v-model="form.phoneNumber"
          type="phone"
          :autocomplete="false"
          :error-messages="errorPhoneNumber"
        >
        </v-text-field>
        <v-row>
          <v-col cols="6">
            <v-btn
              class="mt-7"
              color="black"
              block
              outlined
              @click="isPhoneNumberExist(form)"
            >
              Submit
            </v-btn>
          </v-col>

          <v-col>
            <v-btn class="mt-7" color="red" block outlined @click="onCancel()">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div v-if="showTokenForm">
      <TokenModel
        @passwordChanged="tokenChild()"
        :userTelephone="form.phoneNumber"
      />
    </div>
  </v-dialog>
</template>

<script>
import TokenModel from "./TokenModel.vue";
import UserRegister from "@/services/user";

export default {
  components: { TokenModel },
  data: () => ({
    form: {
      phoneNumber: "",
    },
    showTokenForm: false,
    errorPhoneNumber: "",
    ForgotPasswordDialog: false,
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

    onCancel() {
      this.ForgotPasswordDialog = false;
    },
    tokenChild() {
      this.showTokenForm = false;
      this.ForgotPasswordDialog = false;
    },

    async isPhoneNumberExist(form) {
      console.log(form.phoneNumber);

      console.log(`Submit pressed `);
      if (this.form.phoneNumber == "") {
        this.errorPhoneNumber = "Please Enter your Phone number";
        return;
      }
      if (!this.validatePhoneNumber()) {
        this.errorPhoneNumber = "Not a valid phone number";
        return;
      }
      try {
        console.log("Looking for user account", this.form.phoneNumber);
        const user = await UserRegister.resetPassword({
          Telephone: this.form.phoneNumber,
        });
        if (user) {
          this.showTokenForm = true;
        }
        return;
      } catch (error) {
        this.errorPhoneNumber = "invalid User";

        console.log(error.response);
      }
    },
  },
};
</script>