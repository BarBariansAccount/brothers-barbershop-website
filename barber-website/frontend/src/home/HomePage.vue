<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-4 text-right">
        Barbershop Current Status: <strong>{{ status }}</strong> <br />
        Next Availability: <strong>{{ nextAvailability }}</strong>
      </v-col>
    </v-row>
    <v-row class="map-desc-row" justify="center">
      <v-col cols="12" lg="6" justify="center">
        <v-card
          class="text-center d-flex flex-column align-center justify-center"
          height="100%"
          flat
        >
          <div class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.176987553061!2d-73.62923248398603!3d45.48638057910121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc919fd69f12841%3A0xbe6e66664b3010b9!2s4961c%20Queen%20Mary%20Rd%2C%20Montreal%2C%20QC%20H3W%201X4!5e0!3m2!1sen!2sca!4v1665265848312!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" justify="center">
        <v-card
          class="text-center d-flex flex-column align-center justify-center"
          height="100%"
          flat
        >
          <div class="barbershop-description">
            <h2 class="mt-2">COME GET A HAIRCUT</h2>
            <br />
            <p class="description-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident fuga, molestias deleniti vel rerum nisi aperiam.
              Quibusdam corrupti rem voluptate explicabo minus officia, incidunt
              eum dolorem voluptas assumenda. Aut, quia? Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Reiciendis maxime, enim et
              aliquid sunt quibusdam quidem nam quo consectetur animi, dolore
              minima quam nostrum earum. Commodi sint eligendi in ratione. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
              accusamus harum ex incidunt aperiam voluptate iure non alias, esse
              fugiat, quas nam! Voluptates velit sed labore ipsum nobis
              provident corrupti.
            </p>
            <v-btn color="#5F6BBA" class="mt-12 white--text" @click="bookNow()"
              >BOOK NOW</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BarbershopStatusService from "@/services/barbershopStatus";
export default {
  name: "HomePage",
  data: () => ({
    status: "",
    nextAvailability: "3:00pm",
  }),
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
    async getStatus() {
      const response = await BarbershopStatusService.getStatus();
      this.status = response.data;
    },
  },
  mounted() {
    this.getStatus();
  },
};
</script>

<style>
.barbershop-description {
  text-align: center;
  /* margin-left: 14%; */
  width: 75%;
  height: 100%;
}
.map {
  text-align: center;
  /* margin-left: 14%; */
  width: 75%;
  height: 100%;
  border-color: #5f6bba;
  border-style: solid;
}
.description-paragraph {
  /* margin-right: 10%;
  margin-left: 10%; */
  margin-top: 10px;
}
.map-desc-row {
  margin-bottom: 20%;
}
</style>
