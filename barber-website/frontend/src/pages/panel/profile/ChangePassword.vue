<template>

  <ValidationObserver v-slot="{ handleSubmit }" cl>
    <form @submit.prevent="handleSubmit(onSubmit)" class="px-4">
      <v-row>
        <!-- old -->
        <v-col cols="12" md="4">
          <ValidationProvider name="oldPassword" rules="required" v-slot="{ errors }">
            <v-text-field outlined dense label="old password" v-model="oldPassword" :error-messages="errors[0]"
              @click:append="show4 = !show4" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show4 ? 'text' : 'password'"></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="newPassword" rules="required" v-slot="{ errors }">
            <v-text-field outlined dense label="new password" v-model="newPassword" :error-messages="errors[0]"
              @click:append="show4 = !show4" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show4 ? 'text' : 'password'"></v-text-field>
          </ValidationProvider>
          <v-btn block type="submit" color="secondary">Save</v-btn>
        </v-col>

      </v-row>
    </form>
  </ValidationObserver>

</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
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

    newPassword: null,
    oldPassword: null,
  }),
  methods: {
    async onSubmit() {
      const data = {
        OldPassword: this.oldPassword,
        NewPassword: this.newPassword,
      };
      try {
        await UserService.updatePassword(data);

        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'password updated successfully',
        
        })
      } catch (error) {
        console.log('erroe',error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data,
        
        })
      }
    },

  },

};
</script>

