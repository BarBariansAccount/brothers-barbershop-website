<template>
  <v-container>
    <div class="profile mb-5">
      <div class="icon">
        <v-icon size="140">
          mdi-account-circle-outline
        </v-icon>
        <v-icon class="edit-icon" size="30" color="blue">
          mdi-pencil-circle-outline
        </v-icon>
      </div>
      <div class="mx-5">
        <h1>Profile page</h1>
        username
      </div>
    </div>
    <v-row class="mb-5">
      <!-- left col -->
      <v-col cols="12" md="8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)" class="bg-purp px-4">

            <v-row>
              <v-col cols="12" md="6">
                <ValidationProvider name="firstName" rules="required|alpha" v-slot="{ errors }">
                  <v-text-field outlined dense label="first name" v-model="firstName" append-icon="mdi-account"
                    :error-messages="errors[0]">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider name="lastName" rules="required|alpha" v-slot="{ errors }">
                  <v-text-field outlined dense label="last name" v-model="lastName" append-icon="mdi-account" :error-messages="errors[0]">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
                  <v-text-field outlined dense label="email" v-model="email" append-icon="mdi-email"
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- contact -->
              <v-col cols="12">
                <ValidationProvider name="contact" rules="required|digits:11" v-slot="{ errors }">
                  <v-text-field outlined dense label="contact" v-model="contact" append-icon="mdi-phone"
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- address -->
              <v-col cols="12">
                <ValidationProvider name="address"  v-slot="{ errors }">
                  <v-text-field outlined dense label="address" v-model="address" 
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- city -->
              <v-col cols="12" md="6">
                <ValidationProvider name="city"  v-slot="{ errors }">
                  <v-text-field outlined dense label="city" v-model="city" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- zip -->
              <v-col cols="12" md="6">
                <ValidationProvider name="zip" rules="numeric" v-slot="{ errors }">
                  <v-text-field outlined dense label="zip" v-model="zip" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- birthday -->
              <v-col cols="12" md="6">
                <ValidationProvider name="birth"  v-slot="{ errors }">
                  <v-text-field outlined dense label="birth" v-model="birth" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- Skill -->
              <v-col cols="12" md="6">
                <ValidationProvider name="skill"  v-slot="{ errors }">
                  <v-text-field outlined dense label="skill" v-model="skill" :error-messages="errors[0]">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- password -->
              <v-col cols="12">
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                  <v-text-field outlined dense label="password" v-model="password" :error-messages="errors[0]"
                    @click:append="show4 = !show4" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"></v-text-field>
                </ValidationProvider>
              </v-col>
              <!-- action -->
              <v-col cols="12" class="text-center">
                <v-btn type="reset" color="primary">Cancel</v-btn>
                <v-btn type="submit" color="primary" class="ml-3">Save</v-btn>
              </v-col>
              <!-- back -->
              <v-col cols="12" class="text-center">
                <v-btn small text>
                  go back to home page
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-col>
      <!-- right col -->
      <v-col cols="12" md="4" class="py-0">
        <div class="bg-purp px-4 mt-4 mt-md-0">
          <h3>Appoinments</h3>
          <ul v-for="(item,i) in items" :key="i">
            <li>
              {{item.date}}
              <div>
                {{item.service}}
              </div>
              <div class="pa-2 text-right">
                <v-btn depressed small color="primary">confirm</v-btn>
                <v-btn depressed small color="primary" class="ml-2">cancel</v-btn>
              </div>
            </li>
          </ul>
        </div>
        <div class="bg-purp px-4 mt-4 ">
          <h3>Orders</h3>
          <ul v-for="(item,i) in orders" :key="i">
            <li>
              {{item.name}}
              <span class="ml-auto">
                {{item.count}}X
              </span>
              <div>
                {{item.date}}
              </div>
              <div class="pa-2 text-right">
                <v-btn depressed small color="primary">Edit</v-btn>
                <v-btn depressed small color="primary" class="ml-2">cancel</v-btn>
              </div>
            </li>
          </ul>
        </div>
        <div class="bg-purp px-4 mt-4 ">
          <h3>Availbility</h3>
          <ul v-for="(item,i) in Availbility" :key="i">
            <li>
              {{item.day}}
              <span class="ml-auto">
                {{item.date}}
              </span>
              <div>
                {{item.from}}
                {{" To"}}
                {{item.to}}
              </div>
              <div class="pa-2 text-right">
                <v-btn depressed small color="primary">Edit</v-btn>
                <v-btn depressed small color="primary" class="ml-2">cancel</v-btn>
              </div>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email,alpha,digits } from 'vee-validate/dist/rules';
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
    firstName: null,
    lastName: null,
    email: null,
    contact: null,
    address: null,
    city: null,
    zip: null,
    birth: null,
    skill: "Haircut",
    password: null,
    items: [
      {
        date: '2022-09-12 12:00', service: 'haircut by kevin'
      },
      {
        date: '2022-09-12 12:00', service: 'haircut by kevin'
      }
    ],
    orders: [
      {
        date: '2022-09-12 12:00', name: 'shampoo', count: 3
      },
      {
        date: '2022-09-12 12:00', name: 'Conditioner', count: 1
      }
    ],
    Availbility:[
     {
      date:'2022-09-12', from: '9:00 AM',to: '12:00 PM',  day: 'Monday' 
     },
     {
      date:'2022-09-12' ,from: '9:00 AM',to: '12:00 PM',  day: 'Tuseday'
     },
     {
      date:'2022-09-12' ,from: '9:00 AM',to: '12:00 PM',  day: 'Friday'
     },
    ]

  }),
  methods: {
    onSubmit() {
      alert('Form has been submitted!');
    }
  }
}
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
  background-color: #DBDDEF !important;
}
</style>