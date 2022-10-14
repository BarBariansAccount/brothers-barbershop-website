<template>
  <div class="bg-purp mt-4">

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class=" px-4">

        <v-row>
          <!-- old pass -->
          <v-col cols="12">
            <ValidationProvider name="oldPassword" rules="required" v-slot="{ errors }">
              <v-text-field outlined dense label="old password" v-model="oldPassword" :error-messages="errors[0]"
                type="password"></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- new pass -->
          <v-col cols="12">
            <ValidationProvider name="newPassword" rules="required" v-slot="{ errors }">
              <v-text-field outlined dense label="new password" v-model="newPassword" :error-messages="errors[0]"
                type="password"></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- confirm pass -->
          <v-col cols="12">
            <ValidationProvider name="confirmPassword" rules="required" v-slot="{ errors }">
              <v-text-field outlined dense label="confirm password" v-model="confirmPassword"
                :error-messages="errors[0]" type="password"></v-text-field>
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
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, alpha, digits } from 'vee-validate/dist/rules';
import UserService from '@/services/user'
extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'Enter valid email'
});
extend('alpha', {
  ...alpha,
  message: 'just alpha is accepted'
});
extend('digits', {
  ...digits,
  message: 'contact number must be 11 digits'
});
export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data: () => ({
    show4: false,
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,

  }),
  methods: {
    async get() {
      await UserService.getAll()
    }
  },
  mounted() {
    console.log('env', process.env.VUE_APP_API_URL)
    this.get()
  }
}
</script>

<style>

</style>