<template>
  <v-container>
    <v-btn color="primary" text to="/">
      <v-icon left>
        mdi-chevron-left
      </v-icon>
      Back to home</v-btn>
    <ValidationObserver v-slot="{ handleSubmit, errors }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="px-4">
        <!-- ------ -->
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1" :editable="!editMode">
            Select Service
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-chip-group v-if="!editMode" v-model="form.service" column mandatory>
              <v-chip v-for="t in services" :key="t" :value="t" filter mandatory active-class="primary--text">
                {{ t }}
              </v-chip>
            </v-chip-group>
            <v-btn color="primary" class="mt-5" small @click="step = 2">
              Continue
              <v-icon right small>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2" :editable="!editMode">
            Select Staff Member
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-chip-group v-if="!editMode" v-model="selectedBarber" column>
              <v-chip v-for="b in barbers" :key="b.userid" x-large :value="b.userid" filter class="ma-2" color="#404144"
                text-color="white">
                <v-avatar left size="50">
                  <v-img alt="Avatar" width="90" :src="b.picturelink ? b.picturelink : '/images/avatar.svg'" />
                </v-avatar>
                {{ b.firstname + " " + b.lastname }}
              </v-chip>
            </v-chip-group>
            <v-btn text class="mt-5" small @click="step = 1">
              Previous
            </v-btn>
            <v-btn color="primary" class="mt-5" small @click="step = 3">
              Continue
              <v-icon right small>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3" :editable="!editMode">
            Select prefered Date and Time
            <!-- <v-progress-circular v-if="loadingDate" indeterminate color="primary"></v-progress-circular> -->
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-row v-if="!editMode">
              <v-col cols="12" md="6">
                <v-date-picker landscape v-model="picker" full-width :allowed-dates="allowedDates"
                  @click:date="getAvailHours" />
              </v-col>
              <v-col cols="12" md="6">
                <div class="font-weight-bold">Available on {{ picker }} :</div>
                <div class="text-muted">Time zone</div>
                <v-progress-circular v-if="loadingHours" indeterminate color="primary"></v-progress-circular>
                <ValidationProvider name="appointment" rules="required" v-slot="{ errors }">
                  <v-chip-group class="mt-4" v-model="form.appointment_id" column key="b" mandatory>
                    <v-chip v-for="t in availHours" :key="t.appointment_id" :value="t.appointment_id" filter outlined
                      :disabled="t.booked">
                      {{ addAmPm(t.hour) }}
                    </v-chip>
                  </v-chip-group>
                  <span class="error--text" v-if="!loadingHours">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-btn text class="mt-5" small @click="step = 2">
              Previous
            </v-btn>
            <v-btn color="primary" class="mt-5" small @click="step = 4">
              Continue
              <v-icon right small>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4" :editable="!editMode">
            You are nearly done. Enter your details below
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-row>
              <v-col cols="6">
                <ValidationProvider name="mobile" rules="required" v-slot="{ errors }">
                  <v-text-field label="Phone Number" v-model.number="form.Customer_telephone" dense
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                  <v-text-field label="Email" dense v-model="form.Customer_email"
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider name="First" rules="required|alpha_spaces" v-slot="{ errors }">
                  <v-text-field label="First Name" :disabled="loggedUser" dense v-model="form.Customer_First_name"
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider name="last" rules="required|alpha_spaces" v-slot="{ errors }">
                  <v-text-field label="Last Name" :disabled="loggedUser" dense v-model="form.Customer_Last_name"
                    :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <v-textarea label="Note" dense v-model="form.Customer_appointment_notes" />
              </v-col>
            </v-row>
            <div v-for="(v, k) in errors" :key="k">
              <small v-show="v.length > 0" class="red--text"><b>{{ k }}</b>{{ ' : ' + v }}</small>
            </div>
            <v-btn text class="mt-5" @click="step = 3" v-if="!editMode">
              Previous
            </v-btn>
            <v-btn class=" mt-5" color="primary" type="submit">{{ editMode ? "Update" : "Add" }} Appoitnment </v-btn>
          </v-stepper-content>
        </v-stepper>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import appointmentService from "@/services/appointment"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import { required, email, alpha_spaces, digits } from "vee-validate/dist/rules"
import Swal from "sweetalert2"
extend("required", {
  ...required,
  message: "This field is required",
})
extend("email", {
  ...email,
  message: "Enter valid email",
})
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "just alpha is accepted",
})
extend("digits", {
  ...digits,
  message: "telephone number must be 10 digits",
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      services: [
        "Haircut",
        "Haircut + Beard",
        "Line up",
        "Beard only",
        "Line up + Beard",
      ],
      barbers: [],
      selectedBarber: -1,
      availDates: [],
      loadingDate: false,
      picker: null,
      availHours: [],
      loadingHours: false,
      loading: false,
      form: {
        appointment_id: null,
        Customer_First_name: null,
        Customer_Last_name: null,
        Customer_email: null,
        Customer_telephone: null,
        Customer_appointment_notes: null,
        service: null,
      },
      editMode: false,
      loggedUser: false,
      step: 1
    }
  },
  methods: {
    async getDetail() {
      const token = this.$route.query.token
      if (!token) return
      this.loading = true
      try {
        const res = await appointmentService.appointmentDetail(token)
        this.form.Customer_First_name = res.data[0].customer_first_name
        this.form.Customer_Last_name = res.data[0].customer_last_name
        this.form.Customer_email = res.data[0].customer_email
        this.form.Customer_telephone = res.data[0].customer_telephone
        this.form.Customer_appointment_notes =
          res.data[0].customer_appointment_notes
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "get apointment detail",
          text: error?.response?.data,
        })
      }
      this.loading = false
    },
    async getBarbers() {
      this.barbers = []
      this.loading = true
      try {
        const res = await appointmentService.getBarbers()
        this.barbers = res.data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "get barber list",
          text: error?.response?.data,
        })
      }
      this.loading = false
    },
    async getAvailDates(BarberID) {
      this.availDates = []
      this.loadingDate = true
      try {
        const res = await appointmentService.getBarberAvailDates(BarberID)
        this.availDates = res.data
        this.availDates.forEach(
          (item) => (item.available_date = item.available_date.split("T")[0])
        )
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "get Avail dates",
          text: error?.response?.data,
        })
      }
      this.loadingDate = false
    },
    async getAvailHours(date) {
      if (!this.selectedBarber) {
        return Swal.fire({
          icon: "error",
          title: "no barbor ",
          text: "select barber first",
        })
      }
      this.availHours = []
      this.loadingHours = true
      try {
        const res = await appointmentService.getBarberAvailHours(
          this.selectedBarber,
          date
        )
        this.availHours = res.data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "get Avail Hours",
          text: error?.response?.data,
        })
      }
      this.loadingHours = false
    },
    async book() {
      this.loading = true
      try {
        const res = await appointmentService.addAppointment(this.form)

        this.saveLocal()
        console.log(res)
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "appointment booked successfully !",
        })
        this.$router.push(`/appointment/${res.data.accessToken}`)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "error ",
          text: error?.response?.data,
        })
      }
      this.loading = false
    },

    async update() {
      const token = this.$route.query.token
      if (!token) return
      this.loading = true
      this.form.accessToken = token
      let data = Object.assign({}, this.form)
      delete data.appointment_id
      delete data.service
      console.log("data", data)
      try {
        const res = await appointmentService.updateAppointment(data)
        this.$router.push(`/appointment/${res.data.accessToken}`)
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "appointment updated successfully !",
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "error ",
          text: error?.response?.data,
        })
      }
      this.loading = false
    },
    allowedDates(val) {
      if (this.availDates.length == 0) return false
      const index = this.availDates.findIndex(
        (item) => item.available_date == val
      )
      if (index > -1) return true
      return false
    },
    onSubmit() {
      if (this.editMode) {
        this.update()
      } else {
        this.book()
      }
    },
    addAmPm(hour) {
      if (hour < 12) return hour + ":00 AM"
      else if (hour == 12) return hour + ":00 PM"
      else return hour - 12 + ":00 PM"
    },
    saveLocal() {
      // save form date in local storage
      const d = {
        selectedBarber: this.selectedBarber,
        service: this.form.service,
        Customer_First_name: this.form.Customer_First_name,
        Customer_Last_name: this.form.Customer_Last_name,
        Customer_email: this.form.Customer_email,
        Customer_telephone: this.form.Customer_telephone,
        Customer_appointment_notes: this.form.Customer_appointment_notes,
      }
      localStorage.setItem("appointment", JSON.stringify(d))
    },
    fillInput() {
      const store_user = this.$store.state.user // if user is logged in
      const saved_appointment = localStorage.getItem("appointment") // if last appointment exist in local storage
      // fill form logged in user info
      if (store_user) {
        this.form.Customer_First_name = store_user.firstname
        this.form.Customer_Last_name = store_user.lastname
        this.form.Customer_email = store_user.email
        this.loggedUser = true
      } else if (saved_appointment) {
        const parsed = JSON.parse(saved_appointment)

        this.selectedBarber = parsed.selectedBarber

        this.form.service = parsed.service
        this.form.Customer_First_name = parsed.Customer_First_name
        this.form.Customer_Last_name = parsed.Customer_Last_name
        this.form.Customer_email = parsed.Customer_email
        this.form.Customer_telephone = parsed.Customer_telephone
        this.form.Customer_appointment_notes = parsed.Customer_appointment_notes
      }
    },
  },
  mounted() {
    const token = this.$route.query.token
    if (token) {
      this.editMode = true
      this.step = 4
    }
    if (!this.editMode) {
      // load form data from local storage or from loggedIn user
      this.fillInput()

    }
    this.getBarbers()
    this.getDetail()
  },
  watch: {
    selectedBarber(newVal) {
      console.log("newval", newVal)
      if (newVal) {
        this.getAvailDates(newVal)
      }
    },
  },
}
</script>

<style  >
.v-card__title {
  flex-direction: column;
  align-items: flex-start;
}

.v-sheet.v-card {
  border-radius: 20px;
}

.avatar-active {
  border: 3px solid green;
}
.v-chip .v-avatar {
  width: 65px !important;
  height: 65px !important;
}
</style>