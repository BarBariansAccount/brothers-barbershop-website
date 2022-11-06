<template>


  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)" class="px-4">
      <v-row>
        <v-col cols="12" md="6">
          <ValidationProvider name="firstname" rules="required|alpha_spaces" v-slot="{ errors }">
            <v-text-field outlined dense label="first name" v-model="firstname" append-icon="mdi-account"
              :error-messages="errors[0]">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="6">
          <ValidationProvider name="lastname" rules="required|alpha_spaces" v-slot="{ errors }">
            <v-text-field outlined dense label="last name" v-model="lastname" append-icon="mdi-account"
              :error-messages="errors[0]">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
            <v-text-field outlined dense label="email" v-model="email" append-icon="mdi-email"
              :error-messages="errors[0]"></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6">
          <ValidationProvider name="userrole" v-slot="{ errors }">
            <v-text-field outlined dense label="userrole" readonly v-model="userrole" :error-messages="errors[0]"
              disabled>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <!-- action -->
        <v-col cols="12" class="text-center">
          <v-btn type="submit" color="secondary" class="ml-3">Save</v-btn>
        </v-col>

      </v-row>
    </form>
  </ValidationObserver>

</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, alpha_spaces, digits } from "vee-validate/dist/rules";
import UserService from "@/services/user";
import Swal from "sweetalert2";
extend("required", {
  ...required,
  message: "This field is required",
});
extend("email", {
  ...email,
  message: "Enter valid email",
});
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "just alpha is accepted",
});
extend("digits", {
  ...digits,
  message: "telephone number must be 10 digits",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    show4: false,
    firstname: null,
    lastname: null,
    email: null,
    telephone: null,
    address: null,
    city: null,
    zip: null,
    birth: null,
    userrole: null,
    datepicker: false,
  }),
  methods: {
    async onSubmit() {
      const data = {
        FirstName: this.firstname,
        LastName: this.lastname,
        Email: this.email,
        Telephone: this.telephone,
        Password: this.password,
      };
      try {
        await UserService.update(data);
        this.get();
        Swal.fire("User updated successfully !");
      } catch (error) {
        console.log("erro", error);
      }
    },
    async get() {
      try {
        const res = await UserService.getUser();
        this.$store.commit("setUser", res.data[0]);

        const user = res.data[0];

        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.telephone = user.telephone;
        this.userrole = user.userrole;

        console.log("res", res);
      } catch (error) {
        console.log("erro", error);
      }
    },
  },
  mounted() {
    this.get();
  },
};
</script>

