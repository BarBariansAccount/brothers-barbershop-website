<template>
  <div class="bg-purp">
    <div class="profile mb-5">
      <div class="icon">
        <v-icon size="140"> mdi-account-circle-outline </v-icon>
        <v-icon class="edit-icon" size="30" color="blue">
          mdi-pencil-circle-outline
        </v-icon>
      </div>
      <div class="mx-5">
        <h1>Profile</h1>
        <div>
          {{ firstname + " " + lastname }}
        </div>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="px-4">
        <v-row>
          <v-col cols="12" md="6">
            <ValidationProvider
              name="firstname"
              rules="required|alpha"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                label="first name"
                v-model="firstname"
                append-icon="mdi-account"
                :error-messages="errors[0]"
              >
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider
              name="lastname"
              rules="required|alpha"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                label="last name"
                v-model="lastname"
                append-icon="mdi-account"
                :error-messages="errors[0]"
              >
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                label="email"
                v-model="email"
                append-icon="mdi-email"
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- telephone -->
          <v-col cols="12">
            <ValidationProvider
              name="telephone"
              rules="required|digits:10"
              v-slot="{ errors }"
            >
              <v-text-field
                readonly
                outlined
                dense
                label="telephone"
                v-model="telephone"
                append-icon="mdi-phone"
                :error-messages="errors[0]"
                disabled
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider name="userrole" v-slot="{ errors }">
              <v-text-field
                outlined
                dense
                label="userrole"
                readonly
                v-model="userrole"
                :error-messages="errors[0]"
                disabled
              >
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- password -->
          <v-col cols="6">
            <ValidationProvider
              name="password"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                label="password"
                v-model="password"
                :error-messages="errors[0]"
                @click:append="show4 = !show4"
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show4 ? 'text' : 'password'"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- action -->
          <v-col cols="12" class="text-center">
            <v-btn type="reset" color="primary" @click="get">Cancel</v-btn>
            <v-btn type="submit" color="primary" class="ml-3">Save</v-btn>
          </v-col>
          <!-- back -->
          <v-col cols="12" class="text-center">
            <v-btn small text to="/"> go back to home page </v-btn>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, alpha, digits } from "vee-validate/dist/rules";
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
extend("alpha", {
  ...alpha,
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
    password: null,

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
        const res = await UserService.getUser(this.$store.state.user.telephone);
        this.$store.commit("setUser", res.data[0]);

        const user = res.data[0];

        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.telephone = user.telephone;
        this.password = user.password;
        this.userrole = user.userrole;

        console.log("res", res);
      } catch (error) {
        console.log("erro", error);
      }
    },
  },
  mounted() {
    this.get();
    // const user = Object.assign({}, this.$store.state.user)
    // if (user) {

    //   this.firstname = user.firstname
    //   this.lastname = user.lastname
    //   this.email = user.email
    //   this.telephone = user.telephone
    //   this.password = user.password
    //   this.userrole = user.userrole
    // }
  },
};
</script>

<style>
.profile {
  display: flex;
}

.icon {
  position: relative;
}

.edit-icon {
  position: absolute !important;
  right: 0;
  top: 40%;
  background-color: white !important;
  border-radius: 100%;
}

.bg-purp {
  background-color: #dbddef !important;
}
</style>
