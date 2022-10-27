<template>
  <div class="bg-purp mt-4">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="px-4">
        <v-row>
          <!-- old -->
          <v-col cols="6">
            <ValidationProvider name="oldPassword" rules="required" v-slot="{ errors }">
              <v-text-field outlined dense label="old password" v-model="oldPassword" :error-messages="errors[0]"
                @click:append="show4 = !show4" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show4 ? 'text' : 'password'"></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- password -->
          <v-col cols="6">
            <ValidationProvider name="newPassword" rules="required" v-slot="{ errors }">
              <v-text-field outlined dense label="new password" v-model="newPassword" :error-messages="errors[0]"
                @click:append="show4 = !show4" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show4 ? 'text' : 'password'"></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- action -->
          <v-col cols="12" class="text-center">
            <v-btn type="submit" color="primary" class="ml-3">Save</v-btn>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, } from "vee-validate/dist/rules";
import UserService from "@/services/user";
import Swal from "sweetalert2";
extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    show4: false,
    userid: null,
    newPassword: null,
    oldPassword: null,
    datepicker: false,
  }),
  methods: {
    async onSubmit() {
      const data = {
        UserID: this.$store.state.user.userid,
        Telephone: this.telephone,
        OldPassword: this.oldPassword,
        NewPassword: this.newPassword,
      };
      try {
        await UserService.changePassword(data);

        Swal.fire("Password updated successfully !");
      } catch (error) {
        console.log("erro", error);
      }
    }
  },

};
</script>

