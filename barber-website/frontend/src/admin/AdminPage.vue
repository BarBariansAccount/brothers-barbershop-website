<template>
  <div class="container-fluid">
    <v-row class="mt-3 ml-5">
      <v-col cols="12">
        <v-card class="text-center" height="100%" flat>
          <div>
            <span class="text-fonts">Barbershop Current Status:</span>
            <v-btn-toggle>
              <v-btn
                v-for="status in statusItems"
                :key="status.title"
                class="text-fonts"
                outlined
                active-class
                elevation="3"
                color="black"
              >
                {{ status.title }}
              </v-btn>
            </v-btn-toggle>
          </div>
          <br />
          <div class="mt-2">
            <span class="text-fonts">Next Availability:</span>
            <v-btn class="text-fonts" outlined elevation="3" color="black">
              3:00
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-10 pa-5">
      <v-col
        lg="2"
        md="4"
        sm="4"
        cols="6"
        v-for="items in menuItems"
        :key="items.title"
      >
        <div>
          <v-card
            outlined
            tile
            height="120px"
            style="background-color: #34baeb"
            :to="items.path"
          >
            <v-row no-gutters>
              <v-col cols="12">
                <span class="card-font pl-3">
                  {{ items.title }}
                </span>
              </v-col>
              <v-row no-gutters>
                <v-col cols="12">
                  <p class="number-fonts text-right">7</p>
                </v-col>
              </v-row>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusItems: [
        { title: "Empty" },
        { title: "Busy" },
        { title: "Very Busy" },
      ],
      menuItems: [
        { title: "BARBERS", path: "/barbersManagement" },
        { title: "CLIENTS", path: "/" },
        { title: "APPOINTMENT", path: "/" },
        { title: "PHOTOS", path: "/" },
        { title: "PRODUCTS", path: "/" },
        { title: "QUESTIONS", path: "/" },
        { title: "OUR INFO", path: "/" },
      ],
    };
  },
};
</script>

<style>
.text-fonts {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.05em;
  color: #000000;
}

.card-font {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  /* identical to box height */
  letter-spacing: 0.05em;
  color: #ffffff;
}

.number-fonts {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 55px;
  /* identical to box height */
  letter-spacing: 0.05em;
  color: #ffffff;
}
</style>
